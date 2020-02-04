const Configstore = require('configstore');
const inquirer = require('./inquirer');
const pkg = require('../package.json');
const conf = new Configstore(pkg.name);
const UserSettings = require('../models/userSettings');
const systemSettings = require('../systemSettings');

module.exports = {
	setUserSettings: async () => {
		// user inputs
		const locationAnswers = await inquirer.askFileLocations();
		// system settings
		const systemLocationSettings = systemSettings.locations;
		// system database file name
		const dbFile = systemLocationSettings.dbFile;
		// system publish file name
		const publishFile = systemLocationSettings.publishFile;
		// user input database location + system database file name
		const dbFileLocation = `${locationAnswers.dbDir}/${dbFile}`;
		// user input publish file directory + system publish file name
		const publishFileLocation = `${locationAnswers.publishDir}/${publishFile}`;
		// normalized file locations
		const fileLocations = new UserSettings({
			dbFileLocation,
			publishFileLocation
		});
		// store the compiled paths and file names
		conf.set({ fileLocations });
		// conf.set(fileLocation, fileLocations.defaultDbDir);
	},

	getUserSettings: () => {
		return conf.get('userSettings');
	}
};
