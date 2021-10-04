'use strict'
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var reservationSchema = Schema({
    user_id: {type: String, required: true},
    date_reservation: {type: String, required: true},
    cut_day: {type: String, required: true},
    cut_month: {type: String, required: true},
    cut_year: {type: String, required: true},
    cut_hour: {type: String, required: true}
})

module.exports = mongoose.model('reservation', reservationSchema);