var schedule_model = require('../models/schedule');

var controller = {
    getSchedule : (req, res) => {
        const { day } = req.body; 

        schedule_model.find({day}, (err, schedule) => {
            if(err) return res.status(500).send({message: 'Error getting schedule'});

            if(!schedule) return res.status(404).send({message: 'Error, no schedules found'});

            return res.status(200).send({schedule});
        })
    },
    getSchedules: (req, res) => {
        schedule_model.find({}, (err, schedules) => {
            if(err) return res.status(500).send({message: 'Error getting schedules'});
            
            if(!schedules) return res.status(404).send({message: 'Error, no schedules found'});

            return res.status(200).send({message: 'Schedules found', schedules});
        })
    },
    updateSchedule: (req, res) => {
        let params = req.params;
        params = JSON.parse(params.params);

        const { day, open, openHour, closeHour } = params;

        schedule_model.updateOne({day}, {open, openHour, closeHour}, {new:true}, (err, scheduleUpdated) => {
            if(err) return res.status(500).send({message: 'Error updating schedule'});

            if(!scheduleUpdated) return res.status(404).send({message: 'Error: no schedule found'});

            return res.status(200).send({message: 'Schedule updated succesfully', scheduleUpdated});
        })
    },
    updateOpenClose: (req, res) => {
        let params = req.params;
        params. JSON.parse(params.params);

        const { day, open } = params;

        schedule_model.updateOne({day}, {open}, {new:true}, (err, scheduleUpdated) => {
            if(err) return res.status(500).send({message: 'Error updating open data'});

            if(!scheduleUpdated) return res.status(404).send({message: 'Error: no schedule found'});

            return res.status(200).send({message: 'Schedule updated successfully', scheduleUpdated});
        })
    }
}

module.exports = controller;