const express = require('express');
const router = express.Router();

const TrackingControllers = require('../controllers/trackings');

router.get('/', TrackingControllers.tracking_get_all);

router.post('/', TrackingControllers.tracking_add_new);

module.exports = router;