const mysql = require('mysql2');

function createDBConnection(){

    return mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_SCHEMA
    });
}

module.exports = function() {

    return createDBConnection;
}