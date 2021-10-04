'use strict'
var express = require('express');

var loginController = require('../controllers/login');

var router = express.Router();

router.post('/test', loginController.test);
router.post('/access', loginController.access);
router.post('/register', loginController.register);
router.get('/nombre/:params', loginController.getClientName);

module.exports = router;