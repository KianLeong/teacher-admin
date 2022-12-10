module.exports = (sequelize, Sequelize) => {
  return sequelize.define('registry', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    studentId: {
      type: Sequelize.INTEGER
    },
    teacherId: {
      type: Sequelize.INTEGER
    },
  }, {timestamps: false, freezeTableName: true})
}