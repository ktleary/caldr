'use strict';

var fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const utils = require('./utils');
const models = require('./models');
const constants = require('./constants');

const cleanStr = str => str.replace(/[\\$'"]/g, '\\$&');

function readUserSetting(file = constants.settings, callback) {
	fs.readFile(file, (err, data) => {
		if (err) throw err;
		const settings = JSON.parse(data);
		callback(settings);
	});
}

function writeUserSettings(userSettings) {
	let data = JSON.stringify(userSettings, null, 2);

	fs.writeFile(constants.settings, data, err => {
		if (err) throw err;
		console.log(
			`Created configuration with database location: ${userSettings.dbLocation} and file output location: ${userSettings.fileLocation}.`
		);
	});
}

function configureSettings() {
	rl.question(constants.questions.dbDir, dbDir => {
		rl.question(constants.questions.publishDir, publishDir => {
			if (dbDir === '') dbDir = constants.defaultDbDir;
			if (publishDir === '') publishDir = constants.defaultPublishDir;
			utils.ensureExists(dbDir, err => {
				if (err) throw err;
				utils.ensureExists(publishDir, err => {
					if (err) throw err;
					const dbLocation = `${dbDir}/${constants.dbFile}`;
					const fileLocation = `${publishDir}/${constants.publishFile}`;
					const userSettings = new models.UserSettings({
						dbLocation,
						fileLocation
					});
					writeUserSettings(userSettings);
					rl.close();
				});
			});
		});
	});
}

function insertEntry(ts, entry) {
	readUserSetting(constants.settings, settings => {
		const dbLocation = settings.dbLocation;
		let db = {};
		let data = "";
		console.log({ dbLocation });
		if (!fs.existsSync(settings.dbLocation)) {
			console.log('No database was found -- initializing ...');
			db[ts] = [entry];
			data = JSON.stringify(db, null, 2);
			fs.writeFile(dbLocation, data, err => {
				if (err) throw err;
				console.log(
					`Inserted new event: ${new Date(ts)} :  ${entry}.`
				);
			});
		} else {
			fs.readFile(dbLocation, (err, data) => {
				if (err) throw err;
				db = utils.isJson(data) ? JSON.parse(data) : {};
				if (!db[ts]) {
					db[ts] = [entry];
				} else {
					db[ts].push(entry);
				}

				data = JSON.stringify(db, null, 2);
				fs.writeFile(dbLocation, data, err => {
					if (err) throw err;
					console.log(`Inserted new event: ${new Date(ts)} :  ${entry}.`);
				});
			});
		}
	});
}

function processEntry(baseEntry) {
	if (!baseEntry) return console.log('Missing Caldr Entry.');
	const [datestr, entry] = splitFirstRest(baseEntry);
	const ts = parseDatestr(datestr);
	insertEntry(ts, entry);
}

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
	console.log({ str, delim });
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
	parseDatestr,
	processEntry
};
