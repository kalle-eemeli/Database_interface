const express = require('express');
const router = express.Router();

const PersonsControllers = require('../controllers/persons');

router.get('/', PersonsControllers.persons_get_all);

router.get('/:_id', PersonsControllers.persons_get_person);

router.get('/addresses/all', PersonsControllers.persons_get_all_addresses);

router.post('/', PersonsControllers.persons_create_person);

router.delete('/:_id', PersonsControllers.persons_delete_person);

router.patch('/:_id', PersonsControllers.persons_patch_person);

module.exports = router;