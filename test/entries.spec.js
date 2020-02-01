'use strict';

const assert = require('chai').assert;
const { splitFirstRest, parseDatestr } = require('../funcs');

describe('Entry parsing', () => {
	it('returns undefined when no argument is supplied.', () => {
		const entry = undefined;
		const delim = '/';
		const splitEntry = splitFirstRest(entry, delim);

		assert.equal(splitEntry, undefined);
	});
	it('return two strings when a string with one delimiter is supplied.', () => {
		const entry = 'abcde/12345';
		const delim = '/';
		const splitEntry = splitFirstRest(entry, delim);

		assert.equal(splitEntry.length, 2);
	});
	it('return two strings when a string with two delimiter is supplied.', () => {
		const entry = 'abcde/12345/1a2b3c';
		const delim = '/';
		const splitEntry = splitFirstRest(entry, delim);

		assert.equal(splitEntry.length, 2);
	});
	it('handles quoted entries', () => {
		const entry = `2020-02-14:13:30/"Valentine's Day Lunch"`;
		const delim = '/';
		const splitEntry = splitFirstRest(entry, delim);

		assert.equal(splitEntry.length, 2);
	});
	it('returns undefined if no event is supplied after the delimiter.', () => {
		const entry = 'abcde/';
		const delim = '/';
		const splitEntry = splitFirstRest(entry, delim);

		assert.equal(splitEntry, undefined);
	});
});

describe('Date parsing', () => {
	it('returns undefined when no argument is supplied.', () => {
		const datestr = undefined;
		const date = parseDatestr(datestr);

		assert.equal(date, undefined);
	});
	it('returns the correct timestamp when a datetime string is supplied.', () => {
		const datestr = '2011-10-10T14:48:00';
		const dateTs = new Date(datestr).getTime();
		const ts = parseDatestr(datestr);

		assert.equal(dateTs, ts);
	});
		it('returns undefined when a malformed datetime string is supplied.', () => {
		const datestr = '2011-10-1014:48:00';
		const dateTs = new Date(datestr).getTime();
		const ts = parseDatestr(datestr);

		assert.equal(ts, undefined);
	});
});
