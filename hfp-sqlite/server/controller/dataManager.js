'use strict';

const sqlite = require( 'sqlite3' );
const Promise = require( 'mpromise' );

class DataManager {

	constructor() {
		this.db = new sqlite.Database( './db.sqlite' );
	}

	init() {
		let deferred = new Promise;

		this.db.run( 'DROP TABLE IF EXISTS data', [], () => {
			this.db.run( 'CREATE TABLE data (value varchar, count integer)', [], () => {
				this.db.run( 'CREATE INDEX data_index ON data(value)', [], () => {
					deferred.fulfill();
				});
			});
		});

		return deferred;
	}

	selectValue( value ) {
		let deferred = new Promise;

		this.db.all( 'SELECT value, count FROM data WHERE value = (?)', [ value ], ( err, rows ) => {
			if( err ) {
				//console.log( err );
			} else {
				//console.log( rows );
			}

			deferred.fulfill( rows );
		});

		return deferred;
	}

	insertValue( value ) {
		let deferred = new Promise;

		this.db.run( 'INSERT INTO data (value, count) VALUES (?, 1)', [ value ], ( err, rows ) => {
			if( err ) {
				//console.log( err );
			} else {
				//console.log( rows );
			}

			deferred.fulfill();
		});

		return deferred;
	}

	incrementValue( value ) {
		let deferred = new Promise;

		this.db.run( 'UPDATE data SET count = count + 1 WHERE value = (?)', [ value ], ( err, rows ) => {
			if( err ) {
				//console.log( err );
			} else {
				//console.log( rows );
			}

			deferred.fulfill();
		});

		return deferred;
	}

	selectAll() {
		let deferred = new Promise;

		this.db.all( 'SELECT count, value FROM data ORDER BY count DESC LIMIT 5', [], ( err, rows ) => {
			if( err ) {
				//console.log( err );
			} else {
				console.log( rows );
			}

			deferred.fulfill( rows );
		});

		return deferred;
	}

	close() {
		this.db.close();
	}
}

module.exports = DataManager;
