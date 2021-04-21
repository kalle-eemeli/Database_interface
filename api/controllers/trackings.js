const connection = require('../db/config');

exports.tracking_get_all = (req, res, next) => {
    const table = req.params.table_name;
    const sql = `SELECT * FROM Tracking LIMIT 10`;

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

exports.tracking_add_new = (req, res, next) => {

    const user = req.body.userID;
    const project = req.body.projectID;
    
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;

    const defaults = {
        task: null,
        team: 1,
    }

    // res.status(200).json({
    //     message: `${username}`
    // })

    const sql = `INSERT INTO Tracking (user, project, startTime, endTime, team)
                 VALUES ("${user}", "${project}", "${startTime}", "${endTime}", "${defaults.team}")`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            //console.log(error.message);
            res.status(500).json({
                error: error.message,
            });
        } else {
            res.status(201).json({
                message: "SUCCESS",
            });
        }
    })
}