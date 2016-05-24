'use strict';

var fs = require('fs'),
    Heap = require('heap'),
    fsHelper = require('./fsHelper'),
    readline = require('readline'),
    FileLineReader = require('./fileLineReader');

var fileManager = {
    splitFile: function(inputFile, linesPerFile, callback) {
        var files = [],
            lines = [],
            lineCount = 0,
            outputFileDescriptor,
            // readline allows reading of a stream on a line-by-line basis
            lineReader = readline.createInterface({
                input: fs.createReadStream(inputFile)
            }),
            // create the temp file according with the number of lines defined (e.g.: fileLineCount = 100000)
            writeTempFile = function(lines) {
                files.push(
                    fsHelper.createTempFileSync( lines.sort().join('\n') )
                );
            };

        lineReader.on('line', function(line) {
            if (line == '') return;

            if (lines.length && !(lineCount % linesPerFile)) {
                writeTempFile(lines);
                lines = [];
            }

            lines.push(line);
            lineCount++;
        })

        lineReader.on('close', function() {
            if (lines.length) {
                writeTempFile(lines);
            }

            // console.log('[ LOG ] ' + lineCount + ' lines stored in ' + files.length + ' temporary files.');
            callback(null, files);
        });
    },

    getTopLines: function(files, topLinesCount) {
        var i,
            result = [],
            prevLine = null,
            prevLineCount = 0,
            linesHeap = this.createLinesMinHeap(),
            filesHeap = this.createFilesMinHeap();

        for (i = 0; i < files.length; i++) {
            var fileLineReader = new FileLineReader(files[i]);
            filesHeap.push(fileLineReader.getHeapItem());
        }

        var i = 1;
        while (filesHeap.size()) {
            var currentItem = filesHeap.pop(),
                nextItem;

            nextItem = currentItem.reader.getHeapItem();
            if (nextItem) {
                filesHeap.push(nextItem);
            }


            if (prevLine && (!filesHeap.size() || (prevLine !== currentItem.line))) {
                linesHeap.push({
                    line: prevLine,
                    count: prevLineCount
                });

                if (linesHeap.size() > topLinesCount) {
                    linesHeap.pop();
                }

                prevLineCount = 0;
            }

            prevLine = currentItem.line;
            prevLineCount++;
        }

        while (linesHeap.size()) {
            result.unshift(linesHeap.pop());
        }

        return result;
    },

    createLinesMinHeap: function() {
        return new Heap(function(left, right) {
            return left.count - right.count;
        });
    },

    createFilesMinHeap: function() {
        return new Heap(function(left, right) {
            if (left.line < right.line)
                return -1;

            if (left.line > right.line)
                return 1;

            return 0;
        });
    }
}

module.exports = fileManager;