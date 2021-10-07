// TODO: Include packages needed for this application
const generateMarkdown = require('./utils/generateMarkdown');
const renderLicenseBadge = require('./utils/generateMarkdown');
const renderLicenseLink = require('./utils/generateMarkdown');
const renderLicenseSection = require('./utils/generateMarkdown');
const inquirer = require('inquirer');
const fs = require('fs');
// TODO: Create an array of questions for user input
const questions = [
    'GitHub Username: ',
    'Email Address: ',
    'Project Title: ',
    'Project Description: ',
    'Installation Instructions: ',
    'Usage Information: ',
    'Contribution Guidelines: ',
    'Test Instructions: ',
    'License Information: '
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    inquirer.prompt([
        {
            type: "input",
            name: "projectTitle",
            message: questions[2]
        },
        {
            type: "input",
            name: "description",
            message: questions[3]
        },
        {
            type: "input",
            name: "installation",
            message: questions[4]
        },
        {
            type: "input",
            name: "usage",
            message: questions[5]
        },
        {
            type: "list",
            name: "license",
            message: questions[8],
            choices: [
                "MIT",
                "APACHE 2.0",
                "GNU GPL 3.0",
                "BSD 3",
                "None"
            ]
        },
        {
            type: "input",
            name: "contributing",
            message: questions[6]
        },
        {
            type: "input",
            name: "tests",
            message: questions[7]
        },
        {
            type: "input",
            name: "username",
            message: questions[0]
        },
        {
            type: "input",
            name: "email",
            message: questions[1]
        }
    ])
    .then((response) => {
        const badgeLink = renderLicenseLink(response.license);
        const badge = renderLicenseBadge(response.license);
        // const section = `## License Information \n${response.license} \n`
        // const licenseSection = renderLicenseSection(response.license, section);
        fileName = 'README.md'
        fs.writeFile(
            // Read Me File Name
            fileName, 

            // Read Me Content
            `
# ${response.projectTitle} \n
### ${response.description} \n
## ${badge}${badgeLink} \n
## Table of Contents \n
- [Installation Instructions](#installation-instructions)\n
- [Usage Information](#usage-information)\n
- [Contribution Guidelines](#contribution-guidelines)\n
- [Test Instructions](#test-instructions)\n
- [Questions](#questions)\n
## Installation Instructions \n
${response.installation} \n
## Usage Information \n
${response.usage} \n
## Contribution Guidelines \n
${response.contributing} \n
## Test Instructions \n
${response.tests} \n
## Questions \n
Email: ${response.email} \n
GitHub: https://github.com/${response.username} \n--- \n--- \n
            `,
            // Error Handling
            (err) => err ? console.error(err) : console.log('Success!'))

    });
}

// TODO: Create a function to initialize app
function init() {
    // generateMarkdown(data);
    writeToFile();
}

// Function call to initialize app
init();

