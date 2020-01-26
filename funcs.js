"use strict";

const error = {
	NOENTRY: "No entry was supplied.",
	BADENTRY: "Could not read the supplied entry."
};
const entryDelim = "/";

function splitCalenderEntry(str, delim = "/") {
	const idx = str && str.indexOf(delim);
	if (!idx || idx < 0) return;

	const first = str.substring(0, idx);
	const rest = str.substring(idx + 1, str.length);

	return first && rest ? [first, rest] : undefined;
}

module.exports = { splitCalenderEntry };
