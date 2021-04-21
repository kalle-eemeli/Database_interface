const mysql = require('mysql2');

const config = {
    host: "localhost",
    port: "3307",
    user: "root",
    password: "rootpass",
    database: process.env.ACTIVE_DB
};

try{
    const connection = mysql.createConnection(config);
    module.exports = connection;
} catch (error) {
    console.error(error);
}

