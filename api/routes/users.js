var express = require('express');
var router = express.Router();

const UsersController = require('../controllers/users');


router.post('/', UsersController.users_add_user);

router.delete('/:_id', UsersController.users_delete_user);

router.patch('/:_id', UsersController.users_patch_user);

module.exports = router;
