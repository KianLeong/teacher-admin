const db = require('../db/dbconfig')

async function suspend (studentEmail) {
  await db.sequelize.transaction(async (t) => {
    const student = await db.Student.findOne({
      where: {
        email: studentEmail
      }, transaction: t
    })
    if (student == null) {
      throw new Error(studentEmail + ' not found')
    }
    db.Student.update(
      {suspended: 1},
      {
        where: {
          email: studentEmail
        }
      }, {transaction: t}
    )
  })
}

module.exports = {
  suspend: suspend
}