class UserSettings {
	constructor(settings) {
		this.dbFileLocation = settings.dbFileLocation;
		this.publishFileLocation = settings.publishFileLocation;
	}
}

module.exports = UserSettings;
