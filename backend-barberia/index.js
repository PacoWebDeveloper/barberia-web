'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/barberia')
.then(() => {
    console.log('Conexión a la BD establecida con exito');
    //Creacion del servidor
    app.listen(port, () => {
        console.log(`Servidor corriendo en la url: localhost:${port}`);
    })
})
.catch(err => console.log(err));