'use strict';
const fs = require('fs');
const inquirer = require('./inquirer');
const systemSettings = require('../systemSettings');
const { caldrcfg } = require('./configs');
module.exports = {
	setUserSettings: async () => {
		const locationAnswers = await inquirer.askFileLocations();
		const systemLocationSettings = systemSettings.locations;
		const dbFile = systemLocationSettings.dbFile;
		const publishFile = systemLocationSettings.publishFile;
		const dbFileLocation = `${locationAnswers.dbDir}/${dbFile}`;
		const publishFileLocation = `${locationAnswers.publishDir}/${publishFile}`;
		caldrcfg.set({
			dbFileLocation,
			publishFileLocation
		});
		fs.mkdirSync(locationAnswers.dbDir, { recursive: true });
		fs.mkdirSync(locationAnswers.publishDir, { recursive: true });
		!fs.existsSync(dbFileLocation) && fs.writeFileSync(dbFileLocation, '');
		!fs.existsSync(publishFileLocation) &&
			fs.writeFileSync(publishFileLocation, '');
	},

	getUserSettings: () => {
		return caldrcfg.get('userSettings');
	}
};
