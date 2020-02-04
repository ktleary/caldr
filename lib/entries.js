const { caldrcfg } = require('./configs');
const editJsonFile = require('edit-json-file');

const parseDatestr = datestr => {
	if (!datestr) return;
	const entryDate = new Date(datestr);
	return entryDate.getTime() ? entryDate.getTime() : undefined;
};

function insertEntry(ts, evnt) {
	const timestr = ts.toString();
	const dbFileLocation = caldrcfg.get('dbFileLocation');
	let db = editJsonFile(dbFileLocation);
	const _evnt = db.get(timestr) ? db.get(timestr) : [];
	_evnt.push(evnt);
	db.set(timestr, _evnt);
	return db.save();
}

function splitFirstRest(str, delim = '/') {
	const idx = str && str.indexOf(delim);
	if (!idx || idx < 0) return;
	const first = str.substring(0, idx);
	const rest = str.substring(idx + 1, str.length);
	return first && rest ? [first, rest] : undefined;
}

function processEntry(entry) {
	if (!entry) return console.log('Missing Caldr Entry.');
	const [datestr, evnt] = splitFirstRest(entry);
	const ts = parseDatestr(datestr);
	insertEntry(ts, evnt);
}

module.exports = { processEntry };
