const Joi = require('joi')

function validateEmail (text) {
  const schema = Joi.string().email({minDomainSegments: 2})
  const validationResult = schema.validate(text)
  return (validationResult.error == null)
}

module.exports = {
  Joi: Joi,
  findEmailList: ((text) => {
    //Finds group of @symbol with the characters except white spaces behind,
    const mentionedTextList = text.match(/(@[^\s]+)/g)
    if (mentionedTextList)
      return mentionedTextList.map((text) => text.slice(1)).filter(validateEmail)
    else
      return []
  }),

  validateBody: ((schema) => (req, res, next) => {
    const {
      error
    } = schema.validate(req.body)
    if (error) {
      console.log(error)
      res.status(400).send({message: error.message})
    } else {
      next()
    }
  }),

  validateQuery: ((schema) => (req, res, next) => {
    const {
      error
    } = schema.validate(req.query)
    if (error) {
      console.log(error)
      res.status(400).send({message: error.message})
    } else {
      next()
    }
  }),

  asyncWrap: (fn =>
    function asyncUtilWrap (req, res, next, ...args) {
      const fnReturn = fn(req, res, next, ...args)
      return Promise.resolve(fnReturn).catch(next)
    })

}