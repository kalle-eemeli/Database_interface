const express = require('express');
const router = express.Router();

const UtilsControllers = require('../controllers/utils');

router.get('/', UtilsControllers.utils_get_all_tables);

router.get('/:table_name', UtilsControllers.utils_get_all_fields);

router.get('/selectall/:table_name', UtilsControllers.utils_get_all_entitys);

router.patch('/update/:table_name', UtilsControllers.utils_update_table);

module.exports = router;