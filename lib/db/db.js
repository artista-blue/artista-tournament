"use strict";

const path = require('path');

const mongoose = require('mongoose');

const Config = require('node-json-config');
const BASE_DIR = path.join(__dirname, "..", "..");
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
    name: String,
    kana: String,
    level: String,
    dojo: String,
    massogi: String,
    tul: String,
    special: String
});

const Player = mongoose.model('Player', playerSchema);

Player.newInstance = ((json) => {
    return new Player({
	name: json['出場選手'],
	kana: json['氏名ふりがな'],
	level: json['段、級'],
	dojo: json['所属'],
	massogi: json['マッソギ'],
	tul: json['トゥル'],
	special: json['スペシャル']
    });
});
Player.dropCollection = ((callback) => {
    mongoose.connection.db.dropCollection(dbname, function(err, result) {
	callback(err);
    });
});

module.exports = {
    Player: Player
};
