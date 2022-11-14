const express = require('express');
const studentsService = require('../service/student')
const utils = require('../util/util');
const asyncWrap=utils.asyncWrap
const Joi = utils.Joi;
const commonStudentsRouter = express.Router();
const commonStudentsValidator =
    Joi.object().keys({
        teacher: Joi.alternatives().try(Joi.string().email(), Joi.array().items(Joi.string()
            .email()
            .required())).required()
    });

commonStudentsRouter.get('/commonstudents', utils.validateQuery(commonStudentsValidator), asyncWrap(async function (req, res) {
    const teacherEmailList = req.query.teacher;
    const studentEmailList = await studentsService.getCommonStudents(teacherEmailList);
    res.send({students: studentEmailList});

}))
module.exports = commonStudentsRouter