'use strict'
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var noticeSchema = Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: Date, required: true}
})

module.exports = mongoose.model('Notice', noticeSchema);