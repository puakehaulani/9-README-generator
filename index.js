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
            //make an array, use a badge based on which they choose
            type: 'input',
            name: 'license',
            message: 'What kind of license should your project have?',
            default: "MIT",
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
        //insert if statement for checking badge
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

${answers.license}

        `;
        fs.writeFile("README.md", markdownString, err => {
            if (err) console.log(err)
        })
    })

// function call to initialize program
promptUser();
