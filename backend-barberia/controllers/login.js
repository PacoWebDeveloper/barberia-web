'use strict'

const login_model = require('../models/login');
const bcryptjs = require('bcryptjs');

var controller = {
    test: (req, res) => {
        res.status(200).send({
            message: 'Ruta de prueba para login'
        });
    },
    register: (req, res) => {

        var user = new login_model();

        const params = req.body;
        user.user = params.user;
        user.email = params.email;
        user.type = params.type;
        user.password = params.password;

        let passHash = bcryptjs.hashSync(user.password, 8);
        user.password = passHash;

        user.save((err, userStored) => {
            
            if(err)
                if(err.code == 11000) return res.status(500).send({message: 'El email ya existe'});
                else return res.status(500).send({message: 'Error al registrar usuario'});

            if(!userStored) return res.status(404).send({message: 'No se ha podido registar el usuario'});

            return res.status(200).send({message: 'El usuario se ha registrado correctamente',hass: userStored.password});
        })
    },
    access: (req, res) => {

        const params = req.body;
        const e_mail = params.email;
        const pass = params.password;

        login_model.findOne({email: e_mail}, (err, users) => {
            
            if(err) return res.status(500).send({message: 'No se pudieron verificar los datos'});

            if(!users) return res.status(404).send({message: 'El usuario no existe'});

            let passHash = users.password;
            let compare = bcryptjs.compareSync(pass, passHash);
            
            if(compare) {
                
                return res.status(200).send({message: 'Data ok', user: users});
            }
            else{
                return res.status(200).send({message: 'Password error'});
            }

        });        
    },
    getClientName: (req, res) => {
        const id = req.params.params;        

        login_model.findOne({_id: id}, (err, userFound) => {
            if(err) return res.status(500).send({message: 'Error getting users'});

            if(!userFound) return res.status(404).send({message: 'No users found'});

            return res.status(200).send({message: 'User found successfull', userFound});
        })
    }
}

module.exports = controller;