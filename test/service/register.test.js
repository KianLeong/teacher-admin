const registerService = require('../../service/register')
const student = require('../../db/dbconfig').Student
const teacher = require('../../db/dbconfig').Teacher
const registry = require('../../db/dbconfig').Registry

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

jest.mock('../../db/dbconfig', () => {
    const SequelizeMock = require('sequelize-mock');
    const originalModule = jest.requireActual('../../db/dbconfig');

    //Mock the default export and named export 'foo'
    return {
        __esModule: true,
        ...originalModule,
        sequelize: new SequelizeMock()
    };
});

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
    return dbMock.define('registry')
})


describe('registerService.register',()=>{
    it("get value from mock", async()=> {
        const teacherFindOrCreate = jest.spyOn(teacher,"findOrCreate")
        const studentBulkInsert = jest.spyOn(student,"bulkCreate")
        const registryBulkInsert = jest.spyOn(registry,"bulkCreate")

        await registerService.register('teach@teach.com',['student@student.com','student2@student.com']);
        expect(teacherFindOrCreate).toHaveBeenCalledTimes(1);
        expect(studentBulkInsert).toHaveBeenCalledTimes(1);
        expect(studentBulkInsert).toBeCalledWith([{email:'student@student.com'},{email:'student2@student.com'}],expect.anything())
        expect(registryBulkInsert).toHaveBeenCalledTimes(1);
    })
})