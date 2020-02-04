const Configstore = require('configstore');
const conf = new Configstore('userSettings');
const models = require('../models.userSettings');
const settings = require('../settings');


module.exports = {
	setUserSettings: async () => {
		const locations = await inquirer.askFileLocations();
		const locationSettings = settings.locations;
		const dbFile = locationSettings.dbFile;
		const publishFile = locationSettings.publishFile;
		const fileLocations = new  
		conf.set(dbLocation, locations.dbFile);
		conf.set(fileLocation, locations.defaultDbDir);
		conf.set()
	},

	getUserSettings: () => {
		return conf.get('userSettings');
	}
};


/*
defaultDbDir: `${process.env['HOME']}/.config/caldr`,
		dbFile: 'db.json',
		defaultPublishDir: `${process.env['HOME']}/Documents`,
		publishFile: 'caldr.txt'
*/