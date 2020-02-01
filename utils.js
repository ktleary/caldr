'use strict';

const fs = require('fs');

function ensureExists(path, mask, cb) {
	if (typeof mask === 'function') {
		cb = mask;
		mask = parseInt('0777', 8);
	}
	fs.mkdir(path, mask, function(err) {
		if (err) {
			if (err.code === 'EEXIST') cb(null);
			else cb(err);
		} else cb(null); // successfully created folder
	});
}

function isJson(str) {
	try {
		return JSON.parse(str) && !!str;
	} catch (e) {
		return false;
	}
}

module.exports = { ensureExists, isJson };
