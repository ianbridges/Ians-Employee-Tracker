const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'company'
});

const db = {
    viewDept: function () {
        return connection.promise().query(
            'SELECT * FROM `department`'
        );
    },
    viewRole: function () {
        return connection.promise().query(
            'SELECT * FROM `role`'
        );
    },
    viewEmployee: function () {
        return connection.promise().query(
            'SELECT * FROM `employee` join `role` on employee.role_id = `role`.id join department on role.department_id = department.id'
        );
    },
    addDept: function(deptName) {
        return connection.promise().query(
            'INSERT INTO department (`name`) values ( "' + deptName + '" )'
        );
    },
    addRole: function(roleName, deptID, salary){
        return connection.promise().query(
            'INSERT INTO `role` (title, salary, department_id) values ("' + roleName + '" ,  ' + salary + ' ,  ' + deptID + ' )'
        );
    },
    
};

module.exports = db