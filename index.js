const db = require('./db/db.js');
const ascii_text_generator = require('ascii-text-generator');
const inquirer = require('inquirer');
const cTable = require('console.table');

const initialQuestion = {
    type: 'list',
    name: 'chooseNext',
    message: "Choose What you would liike to do.",
    choices: [
        'view all departments'
    ]
}