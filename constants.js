module.exports = Object.freeze({
	errors: {
		NOENTRY: 'No entry was supplied.',
		BADENTRY: 'Could not read the supplied entry.',
		BADDATE: 'Could not read the supplied date.'
	},
	settings: './user_settings.json',
	defaultDB: '~/.config/caldr/db.json',
	outputFile: '~/Documents/caldr.txt',
	get questions() {
		return {
			dbLocation: `Where would you like to store the database? [${this.defaultDB}]?`,
			outputLocation: `Where would you like to output the file? [${this.outputFile}]`
		};
	}
});
