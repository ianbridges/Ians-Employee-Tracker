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
    
};

module.exports = db