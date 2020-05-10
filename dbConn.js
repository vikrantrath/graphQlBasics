const mysql = require('mysql');
const conn = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'graphql_test_db'
})
module.exports = conn;