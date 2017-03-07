"use strict";

const fs = require('fs');
const path = require('path');

const ExcelUtils = require('./ms/excel_utils');

const getKeyName = function (k) {
    return k.split(':')[1];
};

const format = function (entree) {
    entree.metas = {};
    entree.events = {};
    Object.keys(entree).forEach((k) => {
	if (k.startsWith('M')) {
	    const keyname = getKeyName(k);
	    entree.metas[keyname] = entree[k];
	    delete entree[k];
	} else if (k.startsWith('E')) {
	    const keyname = getKeyName(k);
	    entree.events[keyname] = entree[k];
	    delete entree[k];
	}
    });
    return entree;
};

/**
 * Read entry sheet (xlsx)
 */
class EntrySheetReader {

    static readDir (dirname) {
	let entryList = [];
	let fnames = fs.readdirSync(dirname);
	fnames = fnames.filter((x) => { return x.endsWith('.xlsx') || x.endsWith('.xls'); });
	fnames = fnames.map((x) => { return path.join(dirname, x); });
	fnames.forEach((fname) => {
	    const sheetData = EntrySheetReader.readFile(fname);
	    entryList = entryList.concat(sheetData);
	});
	entryList.forEach((entry, i) => {
	    entry.id = (i + 1);
	});
	// format
	entryList.map((x) => {
	    return format(x);
	});
	return entryList;
    }

    static readFile (fname) {
	const fileData = ExcelUtils.readFile(fname);
	let entryList = [];
	// concat data of sheets
	Object.values(fileData).forEach((sheetData) => {
	    entryList = entryList.concat(sheetData);
	});
	// filter row 
	entryList = entryList.filter((x) => { return !!x['氏名']; });
	// append filename
	entryList = entryList.map((x) => { x.filename = path.basename(fname); return x; });
	return entryList;
    }
}

module.exports = EntrySheetReader;
