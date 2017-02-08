"use strict";

const fs = require('fs');
const path = require('path');

const ExcelUtils = require('./ms/excel_utils');

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
	entryList = entryList.filter((x) => { return !!x['出場選手']; });
	// append filename
	entryList = entryList.map((x) => { x.filename = path.basename(fname); return x; });
	return entryList;
    }
}

module.exports = EntrySheetReader;
