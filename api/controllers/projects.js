const connection = require('../db/config');

exports.projects_get_all = (req, res, next) => {
    const sql = "SELECT projectID, projectName FROM Project";

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

exports.projects_overview = (req, res, next) => {
    const sql = "SELECT * FROM projectReview";

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

exports.projects_get_project = (req, res, next) => {
    const id = req.params._id;
    //const table_name = "persons";
    const sql = "SELECT * FROM projects WHERE id=" + id;

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