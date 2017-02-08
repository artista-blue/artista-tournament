"use strict";

const path = require('path');

const expect = require('chai').expect;

const BASE_DIR = path.join(__dirname, "..", "..");
const LIB_DIR = path.join(BASE_DIR, "lib");
const Classifier = require(path.join(LIB_DIR, "utils/classifier"));
const EntrySheetReader = require(path.join(LIB_DIR, "utils/entry_sheet_reader"));

function p(msg) {
    console.log(msg);
}

describe('Classifier', function () {

    describe('classify', function () {
	it('', function () {
	    const dirname = path.join(BASE_DIR, "2016-kawaguchi");
	    const entries = EntrySheetReader.readDir(dirname);
	    p(entries)
	    p('!!!')
	    const classifier = new Classifier(entries);
	    const map = classifier.classify('マッソギ');
	    p(JSON.stringify(map, null, 2));
	});
    });
});
