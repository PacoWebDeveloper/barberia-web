'use strict'

const notice_model = require('../models/notice');

var controller = {
    test: (req, res) => {
        return res.status(200).send({message: 'hi'});
    },
    getNotices: (req, res) => {
        notice_model.find((err, notices) => {
            if(err) return res.status(500).send({message: 'Error to get notices'});

            if(!notices) return res.status(404).send({message: 'No notices found'});

            return res.status(200).send({message: 'notices loaded success', notices});
        });
    },
    saveNotice: (req, res) => {
        const notice = new notice_model();
        const { title, content, date } = req.body;

        notice.title = title;
        notice.content = content;
        notice.date = date;

        notice.save((err, noticeSaved) => {
            if(err) return res.status(500).send({message: 'Error saving notice'});

            if(!noticeSaved) return res.status(404).send({message: 'Can not save notice'});

            return res.status(200).send({message: 'Notice saved succesfully', noticeSaved});
        })
    }
}

module.exports = controller;