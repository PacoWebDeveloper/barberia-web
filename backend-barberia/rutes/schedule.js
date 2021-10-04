'use strict'
var express = require('express');

var scheduleController = require('../controllers/schedule');

var router = express.Router();

router.get('/', scheduleController.getSchedule);
router.get('/allSchedules', scheduleController.getSchedules);
router.put('/:params', scheduleController.updateSchedule);
router.put('/open/:params', scheduleController.updateSchedule);

module.exports = router;