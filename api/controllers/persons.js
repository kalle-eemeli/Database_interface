const connection = require('../db/config');

exports.persons_get_all = (req, res, next) => {
    const sql = "SELECT * FROM persons";

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

exports.persons_get_person = (req, res, next) => {
    const id = req.params._id;
    const table_name = "persons";
    const sql = "SELECT * FROM persons WHERE id=" + id;

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

exports.persons_create_person = (req, res, next) => {
    const firstname = req.body.first_name;
    const lastname = req.body.last_name;
    const address = req.body.address;


    const sql = `INSERT INTO Person (first_name, last_name, address) VALUES ("${firstname}", "${lastname}", "${address}")`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.log(error.message);
            res.status(500).json({
                error: error.message,
            });
        } else {
            res.status(201).json({
                message: `Person ${firstname} with address ${address} was added`,
            });
        }
    })
}

//TODO: remove person from all other tables to avoid conflict

exports.persons_delete_person = (req, res, next) => {
    const id = req.params._id;

    const sql = `DELETE FROM Person WHERE personID=${id}`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.log(error.message);
            res.status(500).json({
                error: error.message,
            });
        } else {
            res.status(200).json({
                message: `Entry with id ${id} was deleted`,
            });
        }
    });
}

exports.persons_get_all_addresses = (req, res, next) => {
    
    const sql = 'SELECT addressID FROM Address';

    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.log(error);
            res.status(500).json({
                error: error.message,
            })
        } else {
            res.status(200).send(results);
        }
    })

}

exports.persons_patch_person = (req, res, next) => {
    const id = req.params._id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const address = req.body.address;
    const phone = req.body.phone;
    const email = req.body.email;

    const sql = `UPDATE Person SET firstName="${firstname}", lastName="${lastname}", address=${address}, phoneNumber="${phone}", email="${email}" WHERE personID=${id}`;

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