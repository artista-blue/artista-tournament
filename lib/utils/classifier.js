"use strict";

const p = (msg) => {
    console.log(msg);
};

class Classifier {

    constructor (entries) {
	Object.freeze(entries);
	this.entries = entries;
	this.keyList = this.getKeyList();
	this.classify();
    }

    getKeyList () {
	const keySet = new Set();
	this.entries.forEach((entry) => {
	    Object.keys(entry).forEach((key) => {
		keySet.add(key);
	    });
	});
	return Array.from(keySet);
    }
    
    classify () {
	const map = {};
	this.keyList.forEach((key) => {
	    map[key] = this.classifyByKey(key);
	});
	this.map = map;
    }

    classifyByKey (key) {
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

    getClass (name) {
	return this.map[name];
    }
    
    dump () {
	this.keyList.forEach((key) => {
	    p("==============================================");
	    p(key);
	    p("---------");
	    p(this.map[key]);
	});
    }
}

module.exports = Classifier;
