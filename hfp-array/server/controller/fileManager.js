'use strict';

const fs = require( 'fs' );
const eventstream = require( 'event-stream' );

class FileManager {
	constructor() {
		this.filePath = 'files/data_small.txt';
	}

	proccessFile( ) {
		const _self = this;
		let result = { lines: [] };

		fs.access( _self.filePath, fs.R_OK, ( error ) => {
			if ( error ) return console.log( 'You have no access to read the file!' );

			let createReadStream = fs.createReadStream( _self.filePath );

			createReadStream.on( 'open', function() {
				createReadStream
				.pipe( eventstream.split() )
				.pipe( 
					eventstream.mapSync( function( line ) {
						createReadStream.pause();

						result.lines.push( { times: 1, line: line } );

						(function() {
							createReadStream.resume();
						})();
					})
					.on( 'error', function( error ) {
						console.log( `There was an error while reading the file. | ${ error }` );
					})
					.on( 'end', function() {
						//console.log( 'The proccess of reading the file is over.' );

						_self.countStrings( result );
					})
				);
			});

		});
	}

	compare( a, b ) {
		if ( a.times < b.times )
			return 1;
		else if ( a.times > b.times )
			return -1;
		else 
			return 0;
	}

	compareString( a, b ) {
		if ( a.line < b.line )
			return -1;
		else if ( a.line > b.line )
			return 1;
		else 
			return 0;
	}

	countStrings( obj ) {
		const listLength = obj.lines.length
		let current = { times: 0, line: '' };
		let count = 0;
		let result = [];
		let i = 0;

		obj.lines.sort( this.compareString );

		for ( i; i < listLength; i++ ) {
			if ( obj.lines[i].line !== current.line ) {
				if ( count > 0 ) {
					result.push( { times: count, line: current.line } );
				}

				current = obj.lines[i];
				count = 1;
			} else {
				count++;
			}
		}

		result = result.sort( this.compare ).slice( 0, 5 );

		console.log( result );

		return result
	}
}

module.exports = FileManager;
