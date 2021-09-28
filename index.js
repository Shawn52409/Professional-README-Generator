const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const { resourceLimits } = require('worker_threads');

// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the name of the app?',
    },
    {
      type: 'input',
      name: 'name',
      message: 'Who  is credited for creating the app?',
    },
    {
      type: 'input',
      name: 'techUsed',
      message: 'What technology was used in the app?',
    },
    {
      type: 'input',
      name: 'install',
      message: 'What are the steps required to install the app?',
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

const generateREADME = (answers) => {
var results =
`# ${answers.title}
Created by ${answers.name}

## Technologies Used
`
let techUsedArr = answers.techUsed;
techUsedArr = techUsedArr.split(' ');
for (var i = 0; i<techUsedArr.length; i++){
  results += `- ${techUsedArr[i]}
`
}
results += 
`
## Installation
${answers.install}

## Description
${answers.description}

## Appearance
![Screenshot of website](${answers.link})

## Known Bugs
${answers.knownBugs}

## Contact info
${answers.contactInfo}`;
return results;
};


const init = () => {
  promptUser()
    .then((answers) => writeFileAsync('README.md', generateREADME(answers)))
    .then(() => console.log('Successfully wrote README.md'))
    .catch((err) => console.error(err));
};

init();