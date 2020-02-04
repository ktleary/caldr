const inquirer = require('inquirer');
const settings = require('../systemSettings');

module.exports = {
	askFileLocations: () => {
		const questions = [
			{
				name: 'dbDir',
				type: 'input',
				message: 'Enter the caldr database file directory location:',
				default: `${settings.locations.defaultDbDir}`
				// validate: function(value) {
				// 	if (value.length) {
				// 		return true;
				// 	} else {
				// 		return 'Please enter your username or e-mail address.';
				// 	}
				// }
			},
			{
				name: 'publishDir',
				type: 'input',
				message: 'Enter the published file directory location:',
				default: `${settings.locations.defaultPublishDir}`
				// validate: function(value) {
				// 	if (value.length) {
				// 		return true;
				// 	} else {
				// 		return 'Please enter your password.';
				// 	}
				// }
			}
		];
		return inquirer.prompt(questions);
	}
};
