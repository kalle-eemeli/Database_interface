const express = require('express');
const router = express.Router();

const ProjectsControllers = require('../controllers/projects');

router.get('/', ProjectsControllers.projects_get_all);

router.get('/:_id', ProjectsControllers.projects_get_project);

module.exports = router;