const db = require('./db/db.js');
const ascii_text_generator = require('ascii-text-generator')
const inquirer = require('inquirer');
const cTable = require('console.table');

const intialQuestions = {
    type: 'list',
    name: 'chooseNext',
    message: "Choose What you would like to do.",
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
            } else if (answers.chooseNext === 'add a department') {
                askNewDept();
            } else if (answers.chooseNext === 'add a new role') {
                askNewRole();
            } else if (answers.chooseNext === 'add an employee') {
                addNewEmployee();
            } else if (answers.chooseNext === 'update an employee role') {
                updateEmployeeRole();
            } else if (answers.chooseNext === 'Exit') {
                process.exit();
            }
        })
};


/* */
const addDepartmentQuestion = {
    type: 'input',
    name: 'deptName',
    message: 'Name of the new department?'
};

function askNewDept() {
    inquirer.prompt(addDepartmentQuestion).then(answers => {
        db.addDept(answers.deptName).then(data => {
            askChoice();
        })
    })
};
/* */

/* */
const newRoleQuestions = [
    {
        type: 'input',
        name: 'roleName',
        message: 'Name of the new role?'
    },
    {
        type: 'input',
        name: 'deptID',
        message: 'Department id of the new role?'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Salary of the new role?'
    }
];

function askNewRole() {
    inquirer.prompt(newRoleQuestions).then(answers => {
        db.addRole(answers.roleName, answers.deptID, answers.salary).then(data => {
            askChoice();
        })
    })
};
/* */

/* */
const newEmployeeQuestions = [
    {
        type: 'input',
        name: 'firstName',
        message: 'First name of the new employee?'
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'Last name of the new employee?'
    },
    {
        type: 'input',
        name: 'role',
        message: 'Role id of the new employee?'
    },
    {
        type: 'input',
        name: 'manager',
        message: 'Manager id of the new employee?'
    }
];

function addNewEmployee() {
    inquirer.prompt(newEmployeeQuestions).then(answers => {
        db.addEmployee(answers.firstName, answers.lastName, answers.role, answers.manager).then(data => {
            askChoice();
        })
    })
};
/* */

/* */
function updateRoleQuestion(employees, roles) {
    return [
        {
            type: 'list',
            name: 'employee',
            message: 'What employee do you want to update?',
            choices: employees
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the new employee\'s role id?',
            choices: roles
        }
    ]
};

function updateEmployeeRole() {
    db.viewEmployee().then(employeeData => {
        var employeeNames = employeeData[0].map((employee) => {
            return employee.first_name + ' ' + employee.last_name;
        })
        db.viewRole().then(roleData => {
            var roleNames = roleData[0].map((role) => {
                return role.title;
            })
            inquirer.prompt(updateRoleQuestion(employeeNames, roleNames)).then(answers => {
                var employeeObj = employeeData[0].filter(emp => {
                    return emp.first_name + ' ' + emp.last_name == answers.employee;
                })
                var roleObj = roleData[0].filter(role => {
                    return role.title == answers.role;
                })
                db.updateEmployee(employeeObj[0].id, roleObj[0].id).then(() => {
                    askChoice();
                })
            })
        })
    })
};
/* */

function init() {
    let text = "/*\n" + ascii_text_generator("Ians Employee Tracker", "2") + "\n*/";
    console.log(text);
    askChoice();
};

init();