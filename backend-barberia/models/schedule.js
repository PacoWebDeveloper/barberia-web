'use strict'
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var scheduleSchema = Schema({
    day: {type: String, required: true},
    open: {type: Boolean, required: true},
    openHour: {type: String, required: true},
    closeHour: {type: String, required: true}
})

module.exports = mongoose.model('Schedule', scheduleSchema);