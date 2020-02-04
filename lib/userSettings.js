const Configstore = require('configstore');
const inquirer = require('./inquirer');
const pkg = require('../package.json');
const conf = new Configstore(pkg.name);
const UserSettings = require('../models/userSettings');
const systemSettings = require('../systemSettings');

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
	},

	getUserSettings: () => {
		return conf.get('userSettings');
	}
};
