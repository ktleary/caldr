const fs = require('fs');
const Configstore = require('configstore');
const pkg = require('../package.json');
const caldrcfg = new Configstore(pkg.name);

function checkcfg() {
	if (caldrcfg.size < 2) return false;
	const dbFileLocation = caldrcfg.get('dbFileLocation');
	const publishFileLocation = caldrcfg.get('publishFileLocation');
	return fs.existsSync(dbFileLocation) && fs.existsSync(publishFileLocation);
}
module.exports = { caldrcfg, checkcfg };
