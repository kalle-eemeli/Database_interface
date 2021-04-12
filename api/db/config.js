const mysql = require('mysql2');

const config = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "kalledb",
    database: process.env.ACTIVE_DB
};

try{
    const connection = mysql.createConnection(config);
    module.exports = connection;
} catch (error) {
    console.error(error);
}

