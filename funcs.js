'use strict';

const constants = require('./constants');
const entryDelim = '/';

const cleanStr = str => str.replace(/[\\$'"]/g, '\\$&');

/**
 * Function splitFirstRest: splits string on first instance of delimiter
 *
 * @param {string} str - string with delimiter
 * @param (string) delim - the char to split date from description default "/"
 * @return {Array} of first part and string of everything after delim or (firor undefined
 *
 * @example
 *
 *     splitFirstRest('2020-02-14:13:30/"Valentine's Day Lunch"')
 */

function splitFirstRest(str, delim = '/') {
	const idx = str && str.indexOf(delim);
	if (!idx || idx < 0) return;
	const first = str.substring(0, idx);
	const rest = str.substring(idx + 1, str.length);
	return first && rest ? [first, rest] : undefined;
}

/**
 * Function parseDateStrYMDHM: parses Date in date-time form (e.g. 2011-10-10T14:48:00)
 *
 * @param {string} datestr -date-time form
 * @return timestamp (user locale)
 *
 * @example
 *
 *     splitFirstRest('2020-02-14/"Valentine's Day"')
 */


const parseDateStrYMDHM = datestr => {
	if (!datestr) return;
	const entryDate = new Date(datestr);
	!entryDate.getTime() && console.log(`Error: ${constants.errors.BADDATE}`);
	return entryDate.getTime() ? entryDate.getTime() : undefined;
};

module.exports = { cleanStr, splitFirstRest, parseDateStrYMDHM };
