//TODO: Update, Add, Delete
const connection = require('../db/config');

exports.users_add_user = (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;
    
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phonenumber = req.body.phonenumber;
    const email = req.body.email;

    const defaults = {
        address: null,
        permission: 1,
    }

    // res.status(200).json({
    //     message: `${username}`
    // })

    const sql = `INSERT INTO User (userName, password, permission, firstName, lastName, phoneNumber, email)
                 VALUES ("${username}", "${password}", ${defaults.permission}, "${firstname}", "${lastname}", "${phonenumber}", "${email}")`;

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

exports.users_patch_user = (req, res, next) => {

    const id = req.params._id;
    
    const username = req.body.username;
    const password = req.body.password;
    
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phonenumber = req.body.phonenumber;
    const email = req.body.email;

    const sql = `UPDATE User SET firstName="${firstname}", lastName="${lastname}", userName="${username}", phoneNumber="${phonenumber}", password="${password}", email="${email}" WHERE userID=${id}`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.log(error);
            res.status(500).json({
                error: error.message,
            });
        } else {
            res.status(200).json({
                message: `Updated!`
            })
        }
    })

}

exports.users_get_fullname = (req, res, next) => {

    const sql = `SELECT userID, concat(firstName, ' ', lastName) as fullName from User`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.log(error.message);
            res.status(500).json({
                error: error.message,
            });
        } else {
            res.status(200).send(results);
        }
    })

}

exports.users_delete_user = (req, res, next) => {
    
    const userID = req.params._id;

    const sql = `DELETE FROM User WHERE userID=${userID}`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.log(error.message);
            res.status(500).json({
                error: error.message,
            });
        } else {
            res.status(200).json({
                message: `Entry with id ${userID} was deleted`,
            });
        }
    });


}