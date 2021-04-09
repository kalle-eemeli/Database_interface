const connection = require('../db/config');

const database = process.env.ACTIVE_DB;

exports.utils_get_all_tables = (req, res, next) => {
    //const database = req.params.db_name;

    const sql = `SELECT table_name FROM information_schema.tables WHERE table_schema="${database}"`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.log(error.message);
            res.status(500).json({
                error: error.message,
            });
        } else {
            res.status(200).json(results);
        }
    });
}

exports.utils_get_all_fields = (req, res, next) => {
    const table_name = req.params.table_name;

    const sql = `SELECT column_name FROM information_schema.columns WHERE table_schema="${database}" AND table_name="${table_name}"`;
    //const sql2 = `DESCRIBE ${table_name}`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.log(error.message);
            res.status(500).json({
                error: error.message,
            });
        } else {
            console.log(results);
            res.status(200).json(results);
        }
    });
}

exports.utils_get_all_entitys = (req, res, next) => {
    const table = req.params.table_name;
    const sql = `SELECT * FROM ${table} LIMIT 5`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.log(error.message);
            res.status(500).json({
                error: error.message,
            });
        } else {
            res.status(200).send(results);
        }
    });
}

exports.utils_update_table = (req, res, next) => {
    const fields = req.body.fields;
    const values = req.body.values;
    const table = req.params.table_name;

    res.status(200).json({fields: fields, values: values})

    const sql = `UPDATE Customers
    SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
    WHERE CustomerID = 1;`

}