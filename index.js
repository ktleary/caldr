'use strict';

const fs = require('fs');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const Configstore = require('configstore');

const files = require('./lib/files');

const systemSettings = require('./systemSettings');
const userSettings = require('./lib/userSettings');
const constants = require('./constants');

clear();

console.log(
	chalk.yellow(figlet.textSync('caldr', { horizontalLayout: 'full' }))
);

const dbExists = () => {
	const files = fs.readdirSync(`${systemSettings.locations.defaultDbDir}`);
	return files.includes(`${systemSettings.locations.dbFile}`);
};

const run = async () => {
	if (!process.argv[2])
		return console.log(`Error: ${constants.errors.NOENTRY}`);
	const baseEntry = process.argv[2];
	const _dbExists = dbExists();

	(!_dbExists || baseEntry === constants.commands.RESETCONFIG) &&
		userSettings.setUserSettings();
};

run();
