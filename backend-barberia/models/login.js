'use strict'
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var loginSchema = Schema({
    user: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    type: {type: String, required: true}
})

module.exports = mongoose.model('User', loginSchema);