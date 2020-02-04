'use strict';
const fs = require('fs');
const Configstore = require('configstore');
const inquirer = require('./inquirer');
const pkg = require('../package.json');
const conf = new Configstore(pkg.name);
const UserSettings = require('../models/userSettings');
const systemSettings = require('../systemSettings');
const editJsonFile = require('edit-json-file');

module.exports = {
	setUserSettings: async () => {
		const locationAnswers = await inquirer.askFileLocations();
		const systemLocationSettings = systemSettings.locations;
		const dbFile = systemLocationSettings.dbFile;
		const publishFile = systemLocationSettings.publishFile;
		const dbFileLocation = `${locationAnswers.dbDir}/${dbFile}`;
		const publishFileLocation = `${locationAnswers.publishDir}/${publishFile}`;
		const userSettings = new UserSettings({
			dbFileLocation,
			publishFileLocation
		});
		conf.set({
			dbFileLocation: userSettings.dbFileLocation,
			publishFileLocation: userSettings.publishFileLocation
		});

		// if directories do not exist, create them
		fs.mkdirSync(locationAnswers.dbDir, { recursive: true });
		fs.mkdirSync(locationAnswers.publishDir, { recursive: true });

		// if the files do not exist create empty stubs
		!fs.existsSync(userSettings.dbFileLocation) &&
			fs.writeFileSync(dbFileLocation, '');
		!fs.existsSync(userSettings.publishFileLocation) &&
			fs.writeFileSync(publishFileLocation, '');
	},

	getUserSettings: () => {
		return conf.get('userSettings');
	}
};
