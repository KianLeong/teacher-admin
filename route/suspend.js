const express = require('express')
const suspendService = require('../service/suspend')
const utils = require('../util/util')
const asyncWrap = utils.asyncWrap
const Joi = utils.Joi
const suspendRouter = express.Router()

const suspendValidation = Joi.object().keys({
  student: Joi.string()
    .email()
    .required()
})

suspendRouter.post('/suspend', utils.validateBody(suspendValidation), asyncWrap(async (req, res) => {
  const {student} = req.body
  await suspendService.suspend(student)
  res.status(204).send()
}))

module.exports = suspendRouter