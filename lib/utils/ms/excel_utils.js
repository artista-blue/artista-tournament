"use strict";

const XLSX = require('xlsx');

function p(msg) {
    console.log(msg);
}

class ExcelUtils {

    static readFile (fname) {
	p(`IN: readFile (${fname})`);
	const workbook = XLSX.readFile(fname);
	const sheets = workbook.Sheets;
	const sheetDataMap = {};
	Object.keys(sheets).forEach((sheetName) => {
	    p(sheetName);
	    const sheet = workbook.Sheets[sheetName];
	    const sheetData = ExcelUtils.readSheet(sheet);
	    sheetDataMap[sheetName] = sheetData;
	});
	return sheetDataMap;
    }

    static readSheet (sheet) {
	const json = XLSX.utils.sheet_to_json(sheet);
	return json;
    }
}

module.exports = ExcelUtils;
