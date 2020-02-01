'use strict';

var fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const constants = require('./constants');

const cleanStr = str => str.replace(/[\\$'"]/g, '\\$&');

function readUserSetting(key, file = constants.settings, callback) {
	fs.readFile(file, (err, data) => {
		if (err) throw err;
		const settings = JSON.parse(data);
		callback(settings[key]);
	});
}

function configureSettings() {
	rl.question(constants.questions.dbLocation, dbLocation => {
		rl.question(constants.questions.outputLocation, outputLocation => {
			console.log({ dbLocation, outputLocation });
			rl.close();
		});
	});
}

//
// fs.writeFile(fileName, JSON.stringify(file), function (err) {
//   if (err) return console.log(err);
//   console.log(JSON.stringify(file));
//   console.log('writing to ' + fileName);
// });

/**
 * Function splitFirstRest: splits string on first instance of delimiter
 *
 * @param {string} str - string with delimiter
 * @param (string) delim - the char to split date from description default "/"
 * @return {Array} of first part and string of everything after delim or (firor undefined
 *
 * @example
 *
 *     splitFirstRest('2020-02-14:13:30/"Valentine's Day Lunch"')
 */

function splitFirstRest(str, delim = '/') {
	const idx = str && str.indexOf(delim);
	if (!idx || idx < 0) return;
	const first = str.substring(0, idx);
	const rest = str.substring(idx + 1, str.length);
	return first && rest ? [first, rest] : undefined;
}

/**
 * Function parseDatestr parses Date in date-time form (e.g. 2011-10-10T14:48:00)
 *
 * @param {string} datestr -date-time form
 * @return timestamp (user locale)
 *
 * @example
 *
 *     splitFirstRest('2020-02-14/"Valentine's Day"')
 */

const parseDatestr = datestr => {
	if (!datestr) return;
	const entryDate = new Date(datestr);
	return entryDate.getTime() ? entryDate.getTime() : undefined;
};

module.exports = {
	cleanStr,
	readUserSetting,
	configureSettings,
	splitFirstRest,
	parseDatestr
};
