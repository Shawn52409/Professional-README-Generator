const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the name of the project?',
    },
    {
      type: 'input',
      name: 'name',
      message: 'Who created the app that this README is for?',
    },
    {
      type: 'input',
      name: 'techUsed',
      message: 'What technology was used in the app?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Please give a description of the function of the app.',
    },
    {
        type: 'input',
        name: 'screenshotLink',
        message: 'Where is the location of the screenshot of the working app? (Example: ./assets/img/screenshot.jpg)',
      },    
    {
      type: 'input',
      name: 'knownBugs',
      message: 'What are the known bugs with the app? (Say "None" if there are none that are known)',
    },
    {
      type: 'input',
      name: 'contactInfo',
      message: 'What is your contact info you want included in the README?',
    },
  ]);
};

const generateREADME = (answers) =>
`# ${answers.title}
Created by ${answers.name}

# Technologies Used
${answers.techUsed}

# Description
${answers.description}

# Appearance
![Screenshot of website](${answers.link})

# Known Bugs
${answers.knownBugs}

## Contact info
${answers.contactInfo}`;


const init = () => {
  promptUser()
    .then((answers) => writeFileAsync('README.md', generateREADME(answers)))
    .then(() => console.log('Successfully wrote README.md'))
    .catch((err) => console.error(err));
};

init();
