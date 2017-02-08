"use strict";

const path = require('path');

const expect = require('chai').expect;

const BASE_DIR = path.join(__dirname, "..", "..");
const LIB_DIR = path.join(BASE_DIR, "lib");
const EntrySheetReader = require(path.join(LIB_DIR, "utils/entry_sheet_reader"));

function p(msg) {
    console.log(msg);
}


describe('EntrySheetReader', function () {

    describe('readDir', function () {
	it('', function () {
	    p(BASE_DIR)	    
	    const dirname = path.join(BASE_DIR, "2016-kawaguchi");
	    p(dirname)
	    EntrySheetReader.readDir(dirname);
	});
    });

    describe('readFile', function () {
	it('', function () {
	    const fname = path.join(BASE_DIR, "2016-kawaguchi", "第6回川口大会　川口道場23名.xlsx");
	    p(fname)
	    const fileData= EntrySheetReader.readFile(fname);
	    p(fileData);
	});
    });
});
