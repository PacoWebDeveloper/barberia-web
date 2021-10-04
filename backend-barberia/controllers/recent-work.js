'use strict'

const recentWork_model = require('../models/recent-work');
const fs = require('fs');
const path = require('path');

var controller = {

    home: (req, res) => {
        return res.status(200).send({
            message: 'Soy la home'
        })
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy el metodo o accion test del controlador del recent-work'
        })
    },

    saveRecentWork: (req, res) => {
        var recent_work = new recentWork_model();

        var params = req.body;
        var date = new Date;
        
        recent_work.user = params.user;
        recent_work.date = date;
        recent_work.name = params.name;

        recent_work.save((err, recentWorkStored) => {
            if (err) return res.status(500).send({ message: 'Error al guardar' });

            if (!recentWorkStored) return res.status(404).send({ message: 'No se ha podido guardar' });

            return res.status(200).send({ recentWork: recentWorkStored });
        })
    },

    getRecentwork: (req, res) => {
        var recentWork_Id = req.params.id;

        recentWork_model.findById(recentWork_Id, (err, recentWork) => {

            if (err) return res.status(500).send({ message: 'Error al devolver el trabajo reciente' });

            if (!recentWork) return res.status(404).send({ message: 'El trabajo reciente no existe' });

            return res.status(200).send({ recentWork })
        });
    },

    getRecentworks: (req, res) => {
        recentWork_model.find().exec((err, recentWorks) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });

            if (!recentWorks) return res.status(404).send({ message: 'No hay trabajos recientes' });

            return res.status(200).send({ recentWorks });
        })
    },

    updateRecentWork: (req, res) => {
        var recentWork_Id = req.params.id;
        var update = req.body;

        recentWork_model.findOneAndUpdate({ _id: recentWork_Id }, update, { new: true }, (err, recentWorkUpdated) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar' });

            if (!recentWorkUpdated) return res.status(404).send({ message: 'No Existe el proyecto para actualizar' });

            return res.status(200).send({ recentWork: recentWorkUpdated });
        })
    },

    deleteRecentWork: (req, res) => {
        var recentWork_Id = req.params.id;

        recentWork_model.findOneAndRemove({ _id: recentWork_Id }, (err, recentWorkDeleted) => {
            if (err) return res.status(500).send({ message: 'No se ha podido eliminar le trabajo reciente' });

            if (!recentWorkDeleted) return res.status(404).send({ message: 'No se ha encontrado el trabajo reciente a eliminar' });

            return res.status(200).send({ recentWorkDeleted: recentWorkDeleted });
        })
    },

    uploadImage: (req, res) => {
        var recentWork_Id = req.params.id;
        var fileName = 'Imagen no subida, no existe el archivo';

        if(req.file) {
            var filePath = req.file.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
                recentWork_model.findOneAndUpdate({_id: recentWork_Id}, {image: fileName}, {new:true}, (err, recentWorkUpdated) => {
                    if(err) return res.status(500).send({message: 'La imagen no se pudo subir'});

                    if(!recentWorkUpdated) return res.status(404).send({message: 'No existe el trabajo reciente en la base de datos'});

                    return res.status(200).send({message: 'Imagen subida correctamente', recentWorkUpdated});
                })
            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: 'Tipo de archivo no valido'});
                })
            }
        } else {
            return res.status(200).send({message: fileName});
        }
    },

    getImageFile: function (req, res) {
		var file = req.params.image;
		var path_file = './uploads/' + file;

		fs.exists(path_file, (exists) => {
			if (exists) {
				return res.sendFile(path.resolve(path_file));
			} else {
				return res.status(200).send({
					message: "No existe la imagen..."
				});
			}
		});
	}
}

module.exports = controller;