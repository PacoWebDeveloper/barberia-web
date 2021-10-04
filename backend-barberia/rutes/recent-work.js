'use strict'

var express = require('express');
var RecentWorkController = require('../controllers/recent-work');

var router = express.Router();

//=========== middleware para subir imagenes ==============
//========== MULTER ==================
var multer = require('multer');
const storage = multer.diskStorage({
    destination(req, file = {}, cb) {
        cb(null, './uploads');
    },
    filename(req, file = {}, cb) {
        cb(null, file.originalname);
    } 
})

var mul_upload = multer({dest: './uploads', storage});
//=======FIN MIDDLEWARE===========================================

router.get('/home', RecentWorkController.home);
router.post('/test', RecentWorkController.test);
router.post('/saveRecentWork', RecentWorkController.saveRecentWork);
router.get('/getRecentWork/:id', RecentWorkController.getRecentwork);
router.get('/getRecentWorks', RecentWorkController.getRecentworks);
router.put('/update-recentWork/:id', RecentWorkController.updateRecentWork);
router.delete('/delete-recentWork/:id', RecentWorkController.deleteRecentWork);
router.post('/uploadImage/:id', [mul_upload.single('image')], RecentWorkController.uploadImage);
router.get('/getImages/:image', RecentWorkController.getImageFile);

module.exports = router;