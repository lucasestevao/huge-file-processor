'use strict';

var fileManager = require('./controller/fileManager'),
    inputFile = 'files/data_small.txt',
    fileLineCount = 100000,
    topLinesCount = 5,
    startDate;

function splitFile() {
    startDate = new Date();

    console.log('[ LOG ] Starting to process the file -', startDate);

    fileManager.splitFile(inputFile, fileLineCount, mergeFiles);
}

function mergeFiles(err, files) {
    if (err) return console.log('[ LOG ] The proccess has failed', err);
    
    var result = fileManager.getTopLines(files, topLinesCount),
        i = 0,
        length = result.length;

    console.log('[ LOG ] The proccess has finished. Elapsed Time: ' + (new Date() - startDate) + ' ms');

    for ( i; i < length; i++ ) {
        console.log('[' + (i + 1) + '] ' + result[i].count + ' :: ' + result[i].line.substring(0, 40));
    }
}

splitFile();