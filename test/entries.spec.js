"use strict";

const assert = require("chai").assert;
const { splitFirstRest } = require("../funcs");

describe("Date parsing", () => {
	it("returns undefined when no argument is supplied.", () => {
		const entry = undefined;
		const delim = "/";
		const splitEntry = splitFirstRest(entry, delim);
		
		assert.equal(splitEntry, undefined);
	});
	it("return two strings when a string with one delimiter is supplied.", () => {
		const entry = "abcde/12345";
		const delim = "/";
		const splitEntry = splitFirstRest(entry, delim);
		
		assert.equal(splitEntry.length, 2);
	});
	it("return two strings when a string with two delimiter is supplied.", () => {
		const entry = "abcde/12345/1a2b3c";
		const delim = "/";
		const splitEntry = splitFirstRest(entry, delim);
		
		assert.equal(splitEntry.length, 2);
	});
	it("returns undefined if no event is supplied after the delimiter.", () => {
		const entry = "abcde/";
		const delim = "/";
		const splitEntry = splitFirstRest(entry, delim);
		
		assert.equal(splitEntry, undefined);
	});
});
