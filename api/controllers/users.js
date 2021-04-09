//TODO: Update, Add, Delete

exports.users_add_user = (req, res, next) => {

    const userName = req.body.userName;
    const personID = req.body.personID;
    const permission = req.body.permission;
    const permissionExpire = req.body.permissionExpire;


    const sql = `INSERT INTO User (userName, personID, permission, permissionExpire) VALUES ("${userName}", "${personID}", "${permission}", "${permissionExpire}")`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.log(error.message);
            res.status(500).json({
                error: error.message,
            });
        } else {
            res.status(201).json({
                message: `User ${userName} was added`,
            });
        }
    })
}

exports.users_patch_user = (req, res, next) => {

    const userID = req.params._id;

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
                message: `Entry with id ${id} was deleted`,
            });
        }
    });


}