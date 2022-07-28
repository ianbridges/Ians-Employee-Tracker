const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'F692jKsg6B!bYkl',
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
    addRole: function(roleName, deptID, salary) {
        return connection.promise().query(
            'INSERT INTO `role` (title, salary, department_id) values ("' + roleName + '" ,  ' + salary + ' ,  ' + deptID + ' )'
        );
    },
    addEmployee: function(firstName, lastName, role_id, manager_id){
        return connection.promise().query(
            'INSERT INTO `employee` (first_name, last_name, role_id, manager_id) values ("' + firstName + '" ,  "' + lastName + '" ,  ' + role_id + ' ,  ' + manager_id + ' )'
        );
    },
    updateEmployee: function(employeeID, roleID) {
        return connection.promise().query(
            'UPDATE employee SET role_id = ' + roleID + ' WHERE id = ' + employeeID 
        );
    }
};

module.exports = db