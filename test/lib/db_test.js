"use strict";

const path = require('path');

const async = require('async');
const expect = require('chai').expect;

const BASE_DIR = path.join(__dirname, "..", "..");
const LIB_DIR = path.join(BASE_DIR, "lib");
const Classifier = require(path.join(LIB_DIR, "utils/classifier"));
const EntrySheetReader = require(path.join(LIB_DIR, "utils/entry_sheet_reader"));
const Player = require(path.join(LIB_DIR, "db/db")).Player;

function p(msg) {
    console.log(msg);
}

describe('Classifier', function () {

    beforeEach(function (done) {
	// clear db
	Player.dropCollection((err) => {
	    p(err);
	    done();
	});
    });

    describe('constructor', function () {
	it('', function (done) {
	    const dirname = path.join(BASE_DIR, "2016-kawaguchi");
	    const entries = EntrySheetReader.readDir(dirname);
	    const classifier = new Classifier(entries);
	    async.eachSeries(entries, (entry, next) => {
		const player = Player.newInstance(entry);
		p(player);
		player.save((err) => {
		    next(err);
		});
	    }, (err) => {
		done(err);
	    });
	});
    });
});
