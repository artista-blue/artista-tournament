"use strict";

const path = require('path');

const mongoose = require('mongoose');

const Config = require('node-json-config');
const BASE_DIR = path.join(__dirname, "..");
const CONF_DIR = path.join(BASE_DIR, "conf");

const config = new Config(path.join(CONF_DIR, 'setting.json'));

const host = config.get('mongodb.host');
const dbname = config.get('mongodb.db');
const url = `mongodb://${host}/${dbname}`;
mongoose.connect(url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const playerSchema = mongoose.Schema({
    comp_id: String,
    id: String,
    name: String,
    kana: String,
    filename: String,
    metas: mongoose.Schema.Types.Mixed,
    events: mongoose.Schema.Types.Mixed
});

const Player = mongoose.model('Player', playerSchema);

Player.dropCollection = ((callback) => {
    mongoose.connection.db.dropCollection(dbname, function(err, result) {
	callback(err);
    });
});


const competitionSchema = mongoose.Schema({
    id: String,
    name: String,
    status: String,
    metas: [{
	name: String,
	physical_name: String
    }],
    events: [{
	id: String,
	name: String,
	physical_name: String,
	description: String,
	classes: [{
	    id: String,
	    name: String
	}]
    }]
});
const Competition = mongoose.model('Competition', competitionSchema);

module.exports = {
    Player: Player,
    Competition: Competition
};
