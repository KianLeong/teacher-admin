const express = require('express');
const notificationService = require('../service/notification');
const utils = require('../util/util');
const asyncWrap=utils.asyncWrap
const Joi = utils.Joi;
const retrievefornotificationsRouter = express.Router();

const retrievefornotificationsValidation = Joi.object().keys({
    teacher: Joi.string()
        .email()
        .required(),
    notification: Joi.string()
        .required()
})

retrievefornotificationsRouter.post('/retrievefornotifications', utils.validateBody(retrievefornotificationsValidation),asyncWrap(async function (req, res) {
    const {teacher, notification} = req.body;
    const emailList = await notificationService.retrieveForNotifications(teacher, notification);
    res.send({recipients:emailList});
}))

module.exports = retrievefornotificationsRouter