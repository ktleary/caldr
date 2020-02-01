'use strict';

const constants = require('./constants');
const { readUserSetting, configureSettings, processEntry } = require('./funcs');

if (!process.argv[2]) return console.log(`Error: ${constants.errors.NOENTRY}`);
const baseEntry = process.argv[2];
readUserSetting(constants.settings, val =>
	!val || baseEntry === constants.commands.RESETCONFIG
		? configureSettings()
		: processEntry(baseEntry)
);

console.log({ baseEntry });
// const [datestr, eventstr] = baseEntry.split('/');
// const ts = Date.parse(datestr);
// console.log(Date.parse(datestr).UTC());
