// require inquirer, fs and util
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const { resourceLimits } = require('worker_threads');

// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);

// prompt the user for all the inputs of the README
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the name of the app?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Please provide a description of the app.',
    },
    {
      type: 'input',
      name: 'installInstructions',
      message: 'What are the install instructions for the app.',
    },
    {
      type: 'input',
      name: 'usageInfo',
      message: 'Please provide the usage information for this app.',
    },
    {
      type: 'input',
      name: 'contributionGuidelines',
      message: 'Please provide the contribution guidelines for this app.',
    },
    {
      type: 'input',
      name: 'testInstructions',
      message: 'Please provide the test instructions for this app.',
    },
    {
        type: 'list',
        name: 'license',
        message: 'What license was used for this app?',
        choices: ['Apache', 'Boost', 'BSD 3-Clause', 'BSD 2 Clause'],
      },    
    {
      type: 'input',
      name: 'gitHubUserName',
      message: 'What is your GitHub user name?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email?',
    },    
  ]);
};

// insert the answers from the prompts into a const called README
const generateREADME = (answers) => {
if (answers.license === 'Apache'){
  var licenseBadge = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)]';
} else if (answers.license === 'Boost') {
  var licenseBadge = '[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)]';
} else if (answers.license === 'BSD 3-Clause') {
  var licenseBadge = '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)]';
} else {
  var licenseBadge = '[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)]';
}

  var results =
`# ${answers.title}

${licenseBadge}

## Description
${answers.description}

## Table of Contents
- [Installations] (#installation)
- [Usage] (#usage)
- [License] (#license)
- [Contributing] (#contribution)
- [Tests] (#tests)
- [Questions] (#questions)

## Installation
${answers.installInstructions}

## Usage
${answers.usageInfo}

## License
${answers.license}

## Contributing
${answers.contributionGuidelines}

## Tests
${answers.testInstructions}

## Questions
GitHub Username: ${answers.gitHubUserName}
email address: ${answers.email}`;

return results;
};


const init = () => {
  promptUser()
    // use the aswers to create the README file
    .then((answers) => writeFileAsync('./dist/README.md', generateREADME(answers)))
    .then(() => console.log('Successfully wrote README.md'))
    .catch((err) => console.error(err));
};

init();