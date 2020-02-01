module.exports = Object.freeze({
	errors: {
		NOENTRY: 'No entry was supplied.',
		BADENTRY: 'Could not read the supplied entry.',
		BADDATE: 'Could not read the supplied date.'
	},
	commands: {
		RESETCONFIG: 'reset-config'
	},
	settings: './user_settings.json',
	defaultDbDir: `${process.env['HOME']}/.config/caldr`,
	dbFile: 'db.json',
	defaultPublishDir: `${process.env['HOME']}/Documents`,
	publishFile: 'caldr.txt',
	get questions() {
		return {
			dbDir: `Where would you like to store the database? [${this.defaultDbDir}]? :`,
			publishDir: `Where would you like to output the file? [${this.defaultPublishDir}] :`
		};
	}
});
