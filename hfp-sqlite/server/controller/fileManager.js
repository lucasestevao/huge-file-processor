'use strict';

const fs = require( 'fs' );
const eventstream = require( 'event-stream' );

class FileManager {
	constructor() {
		this.filePath = 'files/data_small.txt';
	}

	proccessFile( queue, db ) {
		const _self = this;

		fs.access( _self.filePath, fs.R_OK, ( error ) => {
			if ( error ) return console.log( 'You have no access to read the file!' );

			let createReadStream = fs.createReadStream( _self.filePath );

			queue.drain = function() {
				//console.log( 'Item have been processed.' );
				createReadStream.resume();
			}

			createReadStream.on( 'open', function() {
				createReadStream
				.pipe( eventstream.split() )
				.pipe( 
					eventstream.mapSync( function( line ) {
						createReadStream.pause();

						(function() {
							queue.push( line, function() {
								//createReadStream.resume();
							});
						})();
					})
					.on( 'error', function( error ) {
						console.log( `There was an error while reading the file. | ${ error }` );
					})
					.on( 'end', function() {
						//console.log( 'The proccess of reading the file is over.' );

						queue.drain = function() {
							console.log( 'All items have been processed.' );

							db.selectAll().then( () => {
								db.close();
								//console.log( 'DataBase is closed.' );
							});
						}
					})
				);
				
			});

		});
	}
}

module.exports = FileManager;
