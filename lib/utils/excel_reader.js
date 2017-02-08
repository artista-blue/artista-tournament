"use strict";

const xlsx = require('xlsx');

function p(msg) {
    console.log(p);
}

class ExcelUtils {

    static readFile (fname) {
	p(`IN: readFile (${fname})`);
	const workbook = xlsx.readFile(fname);
	const sheets = workbook.Sheets;
	Object.keys(sheets).forEach((sheetName) => {
	    const sheet = workbook[sheetName];
	    ExcelUtils.readSheet(sheet);
	});
    }

    static readSheet (sheet) {
	p("IN: readSheet");
	console.log(sheet);
    }
}

module.exports = ExcelUtils;
