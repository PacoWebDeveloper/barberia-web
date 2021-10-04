'use strict'
var reservation_model = require('../models/reservation');

var controller = {
    saveReservation: (req, res) => {
        
        var reservation = new reservation_model();
        const params = req.body;
        reservation.user_id = params.user_id;
        reservation.date_reservation = params.date_reservation;
        reservation.cut_day = params.cut_day;
        reservation.cut_month = params.cut_month;
        reservation.cut_year = params.cut_year;
        reservation.cut_hour = params.cut_hour;

        reservation.save((err, reservationStored) => {
            if(err) return res.status(500).send({message: 'Error saving reservation'});

            if(!reservationStored) return res.status(404).send({message: 'Can not saving reservation'});

            return res.status(200).send({message: 'Reservation stored successfully', reservationStored: reservationStored});
        })
    },
    getAllReservations: (req, res) => {
        const { month } = req.params;
        const cut_month = JSON.parse(month);
        
        reservation_model.find({cut_month: cut_month.month}, (err, reservationsFound) => {
            if(err) return res.status(500).send({message: 'Error geting reservations'});

            if(!reservationsFound) return res.status(404).send({message: 'No reservations found'});

            return res.status(200).send({message: 'Reservations found', reservationsFound});
        })
    },
    getReservations: (req, res) => {
        const params = req.params;
        const id = params.id;

        reservation_model.find({user_id: id},(err, reservations) => {
            if(err) return res.status(500).send({message: 'Error getting reservations'});

            if(reservations == 0) return res.status(404).send({message: 'No reservations found'});

            return res.status(200).send({message: 'Reservation found', reservations});
        })
    },
    loadAvailableSchedules: (req, res) => {
        const month = req.params.month;
        
        reservation_model.find({cut_month: month},(err, reservatedSchedule) => {
            if(err) return res.status(500).send({message: 'Error getting schedules'});

            if(!reservatedSchedule) return res.status(404).send({message: 'No reservations found'});            

            return res.status(200).send({message: 'Reservation found', reservatedSchedule: reservatedSchedule});
        });
    },
    refreshReservation: (req,res) => {
        
        let params = req.params;        
        params = JSON.parse(params.params);        
        
        const { id } = params; 
        const { cut_day, cut_month, cut_year, cut_hour } = params.reservation;         

        reservation_model.updateOne({ _id: id }, {cut_day, cut_month, cut_year, cut_hour}, (err, reservUpdated) => {
            if(err) return res.status(500).send({message: 'Error updating'});

            if(!reservUpdated) return res.status(404).send({message: 'No reservation found'});

            return res.status(200).send({message: 'Reservation updated successfully', reservUpdated});
        });
    },
    deleteReservation: (req, res) => {        
        let _id = req.params.id;
                
        reservation_model.deleteOne({_id}, (err, deletedReserv) => {
            if(err) return res.status(500).send({message: 'Error deleting'});

            if(deletedReserv.deletedCount == 0) return res.status(404).send({message: 'No reservation found'});

            return res.status(200).send({message: 'Reservation deleted', deletedReserv});
        })
    }
}

module.exports = controller;