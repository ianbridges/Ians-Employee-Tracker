const db = require('./db/db.js');
//let ascii_text_generator = require('ascii-text-generator');
const inquirer = require('inquirer');
const cTable = require('console.table');

const intialQuestions = {
    type: 'list',
    name: 'chooseNext',
    message: "Choose What you would liike to do.",
    choices: [
        'view all departments',
        'view all roles',
        'view all employees',
        'add a department',
        'add a new role',
        'add an employee',
        'update an employee role',
        'Exit'
    ]
};

function askChoice() {
    inquirer.prompt(intialQuestions)
        .then((answers) => {
            if (answers.chooseNext === 'view all departments') {
                db.viewDept().then(data => {
                    console.table(data[0]);
                    askChoice();
                })
            } else if (answers.chooseNext === 'view all roles') {
                db.viewRole().then(data => {
                    console.table(data[0]);
                    askChoice();
                })
            } else if (answers.chooseNext === 'view all employees') {
                db.viewEmployee().then(data => {
                    console.table(data[0]);
                    askChoice();
                })
            }
        })
};

function init() {
    //    let text ="/*\n" + ascii_text_generator("Ian's Employee Tracker","2") + "\n*/";
    //    console.log(text);
    askChoice();
};

init();