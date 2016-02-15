'use strict'

let FileManager = require( '../server/controller/fileManager' );
const fileManager = new FileManager();

const object = { lines: [ {times: 0, line: 'my string'}, {times: 0, line: 'my string'}, {times: 0, line: 'my string'}, {times: 0, line: 'my string 2'}, {times: 0, line: 'my string 2'}, {times: 0, line: 'my string 3'} ] };

describe( 'countStrings', function () {
	it( 'should return an object', function () {
		const isObject = typeof fileManager.countStrings( object );

		expect( isObject ).toBe( 'object' );
	});

	it( 'should have maximum of 5 items', function () {
		const length = fileManager.countStrings( object ).length <= 5 ? true : false;

		expect( length ).toBe( true );
	});
}); 