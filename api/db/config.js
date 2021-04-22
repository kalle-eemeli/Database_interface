const mysql = require('mysql2');

const config = {
    host: "",
    port: "3310",
    user: "TTOW110",
    password: "",
    database: process.env.ACTIVE_DB
};

try{
    const connection = mysql.createConnection(config);
    module.exports = connection;
} catch (error) {
    console.error(error);
}

