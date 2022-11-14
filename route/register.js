const express = require('express');
const registerService = require('../service/register');
const utils = require('../util/util');
const asyncWrap=utils.asyncWrap
const Joi = utils.Joi;
const registerRouter = express.Router();

const registerValidation = Joi.object().keys({
    teacher: Joi.string()
        .email()
        .required(),
    students: Joi.array()
        .items(
            Joi.string()
                .email()
                .required()
        ).required()
})


registerRouter.post('/register', utils.validateBody(registerValidation),asyncWrap(async function (req, res) {
    const {teacher,students} = req.body

    await registerService.register(teacher, students)
    res.status(204).send();
}))

module.exports=registerRouter