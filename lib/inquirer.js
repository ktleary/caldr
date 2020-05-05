const inquirer = require('inquirer');
const settings = require('../systemSettings');

module.exports = {
  askFileLocations: () => {
    const questions = [
      {
        name: 'dbDir',
        type: 'input',
        message: 'Enter the caldr database file directory location:',
        default: `${settings.locations.defaultDbDir}`,
      },
      {
        name: 'publishDir',
        type: 'input',
        message: 'Enter the published file directory location:',
        default: `${settings.locations.defaultPublishDir}`,
      },
    ];
    return inquirer.prompt(questions);
  },
};
