'use strict'

var express = require('express');

var noticeController = require('../controllers/notice');

var router = express.Router();

router.get('/test', noticeController.test);
router.get('/cargar-avisos', noticeController.getNotices);
router.post('/guardar-aviso', noticeController.saveNotice);

module.exports = router;