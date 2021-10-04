'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//CARGAR ARCHIVOS DE RUTAS
var recentWork_routes = require('./rutes/recent-work');
var login_routes = require('./rutes/login');
var notice_routes = require('./rutes/notice');
var reservacion_routes = require('./rutes/reservation');
var schedule_routes = require('./rutes/schedule');

//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//RUTAS
app.use('/api/recent', recentWork_routes);
app.use('/api/login', login_routes);
app.use('/api/notice', notice_routes);
app.use('/api/reservation', reservacion_routes);
app.use('/api/schedule', schedule_routes);

//EXPORTAR
module.exports = app;