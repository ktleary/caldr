'use strict';

const fs = require('fs');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const config = require('./lib/configs');

const systemSettings = require('./systemSettings');
const userSettings = require('./lib/userSettings');
const entries = require('./lib/entries');
const constants = require('./constants');

// clear();

console.log(
	chalk.yellow(figlet.textSync('caldr', { horizontalLayout: 'full' }))
);

const run = async () => {
	const entry = process.argv[2];
	if (!entry) {
		return console.log(`Error: ${constants.errors.NOENTRY}`);
	} else if (entry === constants.commands.RESETCONFIG || !config.checkcfg()) {
		return userSettings.setUserSettings();
	} else {
		return entries.processEntry(baseEntry);
	}
};

run();
