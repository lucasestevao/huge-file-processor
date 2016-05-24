'use strict';

var fs = require('fs'),
    mkdirp = require('mkdirp'),
    tmpFilesCache = [];

process.on('exit', function() {
    while (tmpFilesCache.length) {
        var tmpFile = tmpFilesCache.shift();

        try {
            fs.unlinkSync(tmpFile);
        } catch (err) {
            console.log('Error when trying to unlinkSync', err)
        }
    }
});

module.exports = {
    existsSync: function(path) {
        var fs = require('fs');

        try {
            fs.statSync(path);
        } catch (err) {
            return false;
        }

        return true;
    },

    // if the folder does not exists, create it
    createDirSync: function(path) {
        if (!this.existsSync(path)) {
            mkdirp.sync(path);
        }
    },

    // create the temp file
    createTempFileSync: function(content) {
        var tmpFilePath = this.tempFilePath(),
            // wx - the file is created (if it does not exist) or truncated (if it exists), but fails if path exists.
            fd = fs.openSync(tmpFilePath, 'wx');

        fs.writeSync(fd, content);

        return tmpFilePath;
    },

    tempFilePath: function() {
        var filePath = this.tempPath() + this.tempFileName();
        tmpFilesCache.push(filePath);

        return filePath;
    },

    // create a unique random name for a temp file
    tempFileName: function() {
        var id = null;
        var tempPath = this.tempPath();

        do {
            id = Date.now() + Math.random();
        } while (this.existsSync(tempPath + '/' + id));

        return id + '';
    },

    // return the default temp folder path of the OS
    tempPath: function() {
        var temp = process.env.TMPDIR ||
            process.env.TMP ||
            process.env.TEMP;

        return temp.replace(/([^\/])$/, '$1/');
    }
}