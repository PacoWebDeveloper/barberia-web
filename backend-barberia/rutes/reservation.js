'use strict'
var express = require('express');

var reservationController = require('../controllers/reservation');

var router = express.Router();

router.post('/reservar', reservationController.saveReservation);
router.get('/proxima-cita/:id', reservationController.getReservations);
router.get('/todas-las-citas/:month', reservationController.getAllReservations);
router.get('/cargar-horarios/:month', reservationController.loadAvailableSchedules);
router.put('/actualizar/:params', reservationController.refreshReservation);
router.delete('/eliminar/:id', reservationController.deleteReservation);

module.exports = router;