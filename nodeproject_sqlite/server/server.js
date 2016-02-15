'use strict';

const DataManager = require( './controller/dataManager' );
const FileManager = require( './controller/fileManager' );
const async = require( 'async' );

const db = new DataManager();

let queue = async.queue(( element, callback ) => {
	db.selectValue( element ).then( ( rows ) => {
		if ( rows.length ) {
			db.incrementValue( element ).then( () => {
				//console.log('Update', queue.length());
				callback();
			});
		} else {
			db.insertValue( element ).then( () => {
				//console.log('Insert', queue.length());
				callback();
			});
		}
	});

}, 1);

db.init().then( () => {
	let fileManager = new FileManager();
	fileManager.proccessFile( queue, db );
});