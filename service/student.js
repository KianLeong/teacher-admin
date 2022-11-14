const db = require('../db/dbconfig');

async function getCommonStudents(teacherEmailList) {
    if (!Array.isArray(teacherEmailList)){
        teacherEmailList = [teacherEmailList];
    }

    const teachers = await db.Teacher.findAll({
            where: {
                email: teacherEmailList
            }
        });

    if (teachers == null || teachers.length !== teacherEmailList.length){
        throw new Error("There are invalid teachers in the list")
    }

    const teacherIdList = teachers.map(function(value) {
        return value.id;
    });

    const studentDTOList = await db.Registry.findAll({
        attributes: ["studentId"],
        where: {
            teacherId: teacherIdList
        },
        group: "studentId",
        having: db.Sequelize.where(db.Sequelize.fn('count', db.Sequelize.col('*')), {
            [db.Sequelize.Op.eq]: teachers.length})
    })

    const studentIdList = studentDTOList.map(function(value) {
        return value.studentId;
    });

    const students = await db.Student.findAll({
        where: {
            id: studentIdList
        }
    });

    return students.map(function(value) {
        return value.email;
    });
}

module.exports = {
    getCommonStudents : getCommonStudents
}