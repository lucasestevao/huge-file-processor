'use strict'

let fileManager = require( '../server/controller/fileManager' );

var fs = require('fs');
var inputFile = '../server/files/data_small.txt';
var files = [];
var topLinesCount = 5;

describe( 'File Manager', function () {

	describe( 'getTopLines', function () {

		it('should define an array', function() {

			fileManager.splitFile(inputFile, topLinesCount, function(){

				expect( fileManager.getTopLines( files, topLinesCount ) ).toBeDefined();

			});
		});

	});

});