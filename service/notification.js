const db = require('../db/dbconfig');
const utils = require('../util/util');

async function retrieveForNotifications(teacherEmail, notification) {
    const teacher = await db.Teacher.findOne({
        where: {
            email: teacherEmail
        }
    });
    if (teacher == null) {
        throw new Error(teacherEmail + " does not exist");
    }

    let activeMentionEmailList = []
    const mentionedEmails = utils.findEmailList(notification);
    if (mentionedEmails && mentionedEmails.length > 0) {
        const activeMentionedStudentList = await db.Student.findAll({
            where: {
                email: mentionedEmails,
                suspended: 0
            }
        });

        activeMentionEmailList = activeMentionedStudentList.map(function (value) {
            return value.email;
        });
    }

    let registryList = await db.Registry.findAll({
        where: {
            teacherId: teacher.id
        }
    });

    if (!registryList || registryList.length === 0) {
        registryList = []
    }

    const studentIdList = registryList.map(function (value) {
        return value.studentId;
    });

    let activeRegisteredEmailList = []
    if (studentIdList && studentIdList.length > 0) {

        const activeRegisteredStudentList = await db.Student.findAll({
            where: {
                id: studentIdList,
                suspended: 0
            }
        });

        activeRegisteredEmailList = activeRegisteredStudentList.map(function (value) {
            return value.email;
        });
    }

    return [...new Set([...activeRegisteredEmailList, ...activeMentionEmailList])];

}

module.exports = {
    retrieveForNotifications: retrieveForNotifications
}