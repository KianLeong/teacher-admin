const suspensionService = require('../../service/suspend')
const student = require('../../db/dbconfig').Student

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


describe('suspensionService.suspend',()=>{
    it("get value from mock", async()=> {
        const studentUpdate = jest.spyOn(student,"update")
        await suspensionService.suspend('xyz@abc.com')
        expect(studentUpdate).toHaveBeenCalledTimes(1);

        expect(studentUpdate).toBeCalledWith({suspend:1},{where: {email:'xyz@abc.com'}},expect.anything());
    })
})