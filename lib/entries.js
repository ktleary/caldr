const Configstore = require('configstore');
const packageJson = require('../package.json');
const config = new Configstore(packageJson.name);

function insertEntry(ts, entry) {
	const dbFileLocation = config.get('dbFileLocation');
	return console.log({ dbFileLocation });
}

function processEntry(baseEntry) {
	if (!baseEntry) return console.log('Missing Caldr Entry.');
	const [datestr, entry] = splitFirstRest(baseEntry);
	const ts = parseDatestr(datestr);
	insertEntry(ts, entry);
}
