const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'nolan',
        password: 'password',
        database: 'employees_db'
    },
    console.log('Connected to the Employee database.')
);

module.exports = db;