const fs = require("fs");
const inquirer = require("inquirer");

// array of questions for user
const promptUser = () =>
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your GitHub username?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email address?',
        },
        {
            type: 'input',
            name: 'title',
            message: "What is your project's title?",
        },
        {
            type: 'input',
            name: 'description',
            message: 'Please write a short description of your project',
        },
        {
            type: 'list',
            name: 'license',
            message: 'What kind of license should your project have?',
            choices: ["MIT", "Apache", "GPL", "WTFPL"]
        },
        {
            type: 'input',
            name: 'dependencies',
            message: 'What command should be run to install dependencies?',
            default: "npm i",
        },
        {
            type: 'input',
            name: 'test',
            message: 'What command should be run to run tests?',
            default: "npm test",
        },
        {
            type: 'input',
            name: 'usage',
            message: 'What does the user need to know about using the repo?',
        },
        {
            type: 'input',
            name: 'contribute',
            message: 'What does the user need to know about contributing to the repo?',
        },
    ]).then((answers) => {
        console.log(answers);

        if (answers.license === "MIT") {
            var mdlicense = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
            console.log(answers.license);
        }
        else if (answers.license === "Apache") {
            var mdlicense = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
            console.log(answers.license);
        }
        else if (answers.license === "WTFPL") {
            var mdlicense = "[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)";
            console.log(answers.license);
        } else {
            var mdlicense = "GPL";
            console.log(answers.license);
        };
        //make title into a string with - instead of spaces to be used in links
        const markdownString = `# ${answers.title}

![screenshot]()

[See the project](http://${answers.name}.github.io/${answers.title})  
[Explore the docs](http://github.com/${answers.name}/${answers.title})</div>

---

## Table of Contents

- [About the Project](#About-the-Project)
- [Usage](#Usage)
- [Getting Started](#Getting-Started)
  - [Installation](#Installation)
- [Contributing](#Contributing)
- [Testing](#Testing)
- [Contact](#Contact)
- [License](#License)  

## About the Project  

${answers.description}  

## Usage  

${answers.usage}  

## Getting Started  

To get started, follow these steps:  

### Installation  

Run the following command in your terminal  

    ${answers.dependencies}  

## Testing

Run the following command in your terminal  

    ${answers.test}  

## Contributing

${answers.contribute}

## Contact

<${answers.email}>

## License

${mdlicense}

        `;
        fs.writeFile("README.md", markdownString, err => {
            if (err) console.log(err)
        })
    })

// function call to initialize program
promptUser();
