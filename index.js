'use strict';

const constants = require('./constants');

const getSplitEntryDate = datestr => {
	let [month, day, year] = datestr.split('-');
	month && month--;
	const [hour, minute] = splitEntry[1].split(':');
	const entryDate =
		!!new Date(year, month, day, hour, minute) &&
		new Date(year, month, day, hour, minute);

	!entryDate.getTime() && console.log(`Error: ${errors.BADDATE}`);
};

if (!process.argv[2]) return console.log(`Error: ${constants.errors.NOENTRY}`);

const baseEntry = process.argv[2];
console.log({baseEntry});
// const [datestr, eventstr] = baseEntry.split('/');
// const ts = Date.parse(datestr);
// console.log(Date.parse(datestr).UTC());

