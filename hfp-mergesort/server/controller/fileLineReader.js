var _ = require('lodash'),
    fs = require('fs');

var FileLineReader = function(filePath, options) {
    options = options || {};

    this.filePath = filePath;
    this.fd = 0;
    this.stat = null;
    this.bytesRead = 0;
    this.totalBytesRead = 0;
    this.position = 0;
    this.buffer;
    this.bufferLength = options.bufferLength || 8192;
    this.relativePosition = 0;

    this.initialize();
}

_.extend(FileLineReader.prototype, {

    initialize: function() {
        this.fd = fs.openSync(this.filePath, 'r');
        this.stat = fs.statSync(this.filePath);
        this.fileSize = this.stat.size;
        this.buffer = new Buffer(this.bufferLength);
    },

    getNextLine: function() {
        if (this.position === this.fileSize)
            return;

        var start = this.relativePosition,
            end = this.getLineEnd(start),
            line;


        while (end === -1) {
            this.updateBuffer();
            start = this.relativePosition;
            end = this.getLineEnd(start);
        }

        line = this.buffer.toString('utf8', start, end);
        this.position += end - start;
        this.relativePosition += end - start;

        // Skip the newline character
        if (this.position !== this.fileSize) {
            this.position++;
            this.relativePosition++;
        }

        return line;
    },

    getLineEnd: function(start) {
        var i,
            end = -1;
        newlineCode = '\n'.charCodeAt(0);

        for (i = start; i < this.bytesRead; i++) {
            if (this.buffer[i] === newlineCode) {
                return i;
            }
        }

        if (this.totalBytesRead === this.fileSize) {
            end = this.bytesRead;
        }

        return end;
    },

    updateBuffer: function() {
        var remaining = this.bytesRead - this.relativePosition,
            readCount = Math.min(this.bufferLength, this.fileSize - this.position) - remaining;


        if (remaining) {
            var tmpBuffer = new Buffer(this.bufferLength);
            this.buffer.copy(tmpBuffer, 0, this.relativePosition, this.relativePosition + remaining);
            this.buffer = tmpBuffer;
        }

        if (readCount == 0) {
            throw new Error('Buffer is totally full');
        }

        this.bytesRead = fs.readSync(this.fd, this.buffer, remaining, readCount);
        this.totalBytesRead += this.bytesRead;
        this.relativePosition = 0;

        this.bytesRead += remaining;
    },

    getHeapItem: function() {
        var nextLine = this.getNextLine();

        if (!nextLine) return;

        return {
            line: nextLine,
            reader: this
        };
    }
})

module.exports = FileLineReader;