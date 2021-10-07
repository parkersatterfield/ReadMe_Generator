// TODO: Include packages needed for this application
const generateMarkdown = require('./utils/generateMarkdown');
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
        const badgeLink = generateMarkdown.renderLicenseLink(response.license);
        const badge = generateMarkdown.renderLicenseBadge(response.license);
        const section = `## License Information \n${response.license} \n`
        const licenseSection = generateMarkdown.renderLicenseSection(response.license, section);
        fileName = '../README.md'
        fs.writeFile(
            // Read Me File Name
            fileName, 

            // Read Me Content
            `
# **${response.projectTitle}** \n
### *${response.description}* \n
## ${badge}${badgeLink} \n
## Table of Contents \n
1. [Installation](#installation)\n
2. [Usage](#usage)\n
3. [Contributing](#contributing)\n
4. [Test](#test)\n
5. [Questions](#questions)\n
## Installation \n
${response.installation} \n
## Usage \n
${response.usage} \n
## Contributing \n
${response.contributing} \n
## Test \n
${response.tests} \n
## Questions \n
Email: ${response.email} \n
GitHub: https://github.com/${response.username} \n\n---\n
${licenseSection}
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

