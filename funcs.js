"use strict";

const error = {
	NOENTRY: "No entry was supplied.",
	BADENTRY: "Could not read the supplied entry."
};
const entryDelim = "/";

function splitCalenderEntry(str, delim = "/") {
	if (!str) return;
	 return str.split(delim).length === 2 ? [...str.split(delim)] : [];
}

module.exports = { splitCalenderEntry };
