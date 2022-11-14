const db = require('../db/dbconfig');

async function register(teacherEmail, studentsEmail) {

    await db.sequelize.transaction(async (t) => {
        const [teacher, created] = await db.Teacher.findOrCreate({
            where: {email: teacherEmail}, transaction: t
        });
        console.log(teacherEmail+" created:"+created)

        const studentList = studentsEmail.map(function(value) {
            return {email: value};
        });

        await db.Student.bulkCreate(studentList,{ignoreDuplicates:true, transaction: t});

        const students = await db.Student.findAll({
            where: {email: studentsEmail},
            transaction: t
        });

        const registryList = students.map(function(value){
           return {studentId:value.id, teacherId: teacher.id}
        });
        await db.Registry.bulkCreate(registryList,{ignoreDuplicates:true, transaction: t})
    });

}

module.exports = {
    register: register
}
