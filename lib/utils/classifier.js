"use strict";

class Classifier {

    constructor (entries) {
	Object.freeze(entries);
	this.entries = entries;
    }

    classify (key) {
	let map = {};
	this.entries.forEach((entry) => {
	    const mapKey = entry[key];
	    let list = map[mapKey];
	    if (!list) {
		list = [];
		map[mapKey] = list;
	    }
	    list.push(entry);
	});
	return map;
    }
}

module.exports = Classifier;
