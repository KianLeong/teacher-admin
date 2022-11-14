const studentService = require('../../service/student')

jest.mock('../../model/student',()=>()=> {
    const SequelizeMock = require('sequelize-mock');

    // Setup the mock database connection
    const dbMock = new SequelizeMock();
    return dbMock.define('student',  {
        id: 1,
        email: 'xyz@abc.com',
        suspended: 0
    })
})

jest.mock('../../model/teacher',()=>()=> {
    const SequelizeMock = require('sequelize-mock');

    // Setup the mock database connection
    const dbMock = new SequelizeMock();
    return dbMock.define('teacher',  {
        id: 1,
        email: 'abc@abc.com'
    })
})

jest.mock('../../model/registry',()=>()=> {
    const SequelizeMock = require('sequelize-mock');

    // Setup the mock database connection
    const dbMock = new SequelizeMock();
    return dbMock.define('registry',{
        id: 1,
        teacherId: 1,
        studentId: 1
    })
})

describe('registerService.register',()=>{
    it("get value from mock", async()=> {
        studentEmails = await studentService.getCommonStudents(['abc@abc.com']);
        expect(studentEmails.length).toEqual(1);
        expect(studentEmails[0]).toEqual('xyz@abc.com')
    })
})