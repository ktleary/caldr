class UserSettings {
	constructor(settings) {
		this.dbLocation = settings.dbLocation;
		this.fileLocation = settings.fileLocation;
	}
}

class CaldrEvent {
	constructor(ts, event) {
		this.ts = ts;
		this.event = event;
	}
}

module.exports = { UserSettings, CaldrEvent };
