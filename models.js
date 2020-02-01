class userSettings {
	constructor(settings) {
		this.dbLocation = settings.dbLocation;
		this.outputLocation = settings.outputLocation;
	}
}

module.exports = { userSettings };
