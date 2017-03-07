"use strict";

const process = require('process');

const async = require('async');

const Classifier = require('../lib/utils/classifier');
const EntrySheetReader = require('../lib/utils/entry_sheet_reader');
const Player = require('../lib/models').Player;
const Competition = require('../lib/models').Competition;

function getEventMap (events) {
    const eventMap = {};
    events.map((event) => {
	eventMap[event.name] = event.physical_name;
    });
    return eventMap;
}

const nameMaps = [
    {
	name: '氏名',
	pname: 'name'
    },
    {
	name: 'ふりがな',
	pname: 'kana'
    }
];

function toPhysicalName (json, eventMap, metaMap) {
    json.forEach((entree) => {
//	console.log(entree)
	nameMaps.forEach(function (m) {
	    entree[m.pname] = entree[m.name];
	    delete entree[m.name];
	});
	Object.keys(entree.metas).forEach((metaName) => {
	    const physicalMetaName = metaMap[metaName];
	    entree.metas[physicalMetaName] = entree.metas[metaName];
	    delete entree.metas[metaName];
	});
	Object.keys(entree.events).forEach((eventName) => {
	    const physicalEventName = eventMap[eventName];
	    entree.events[physicalEventName] = entree.events[eventName];
	    delete entree.events[eventName];
	});
    });
    return json;
}

function main (dirname, comp_id, callback) {
    let json = EntrySheetReader.readDir(dirname);
    Competition.findOne({id: "1"}, function (err, competition) {

	//console.log(competition)

	const eventMap = getEventMap(competition.events);
	const metaMap = getEventMap(competition.metas);
	json = toPhysicalName(json, eventMap, metaMap);
	async.eachSeries(json, function (entree, next) {
	    //console.log(entree)
	    entree.comp_id = comp_id;
	    const player = new Player(entree);
	    console.log(player)
	    player.save(next);
	}, function (err) {
	    callback();
	});
    });
}

const dirname = process.argv[2];
const comp_id = process.argv[3];
main(dirname, comp_id, () => {
    process.exit(0);
});
