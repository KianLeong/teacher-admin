require('dotenv').config()
const Sequelize = require('sequelize')
const {DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DIALECT, DB_DATABASE, DB_PORT} = process.env
const db = {}
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  logging: false, //if wish to output log, set to true
  host: DB_HOST,
  dialect: DB_DIALECT,
  port: DB_PORT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
db.sequelize = sequelize
db.Sequelize = Sequelize

const Teacher = require('../model/teacher')(sequelize, Sequelize)
const Student = require('../model/student')(sequelize, Sequelize)
const Registry = require('../model/registry')(sequelize, Sequelize)

db.Teacher = Teacher
db.Student = Student
db.Registry = Registry
module.exports = db