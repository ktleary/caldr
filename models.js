class userSettings {
	constructor(settings) {
		this.dbLocation = settings.dbLocation;
		this.fileLocation = settings.fileLocation;
	}
}

module.exports = { userSettings };
