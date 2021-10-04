'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecentWorkSchema = Schema({
    name: {type: String},
    date: {type: Date},
    user: {type: String}
})

module.exports = mongoose.model('RecentWork', RecentWorkSchema);