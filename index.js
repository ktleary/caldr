'use strict';

const constants = require('./constants');
const { readUserSetting, configureSettings } = require('./funcs');

readUserSetting('storage', constants.settings, val =>
	val ? getUseSetting(val) : configureSettings()
);

if (!process.argv[2]) return console.log(`Error: ${constants.errors.NOENTRY}`);
const baseEntry = process.argv[2];
console.log({ baseEntry });
// const [datestr, eventstr] = baseEntry.split('/');
// const ts = Date.parse(datestr);
// console.log(Date.parse(datestr).UTC());
