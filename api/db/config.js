const mysql = require('mysql2');

const config = {
    host: "142.93.140.110",
    port: "3310",
    user: "TTOW110",
    password: "salasana",
    database: process.env.ACTIVE_DB
};

try{
    const connection = mysql.createConnection(config);
    module.exports = connection;
} catch (error) {
    console.error(error);
}

