const notificationService = require('../../service/notification')
jest.mock('../../model/student', () => () => {
    const SequelizeMock = require('sequelize-mock');

    // Setup the mock database connection
    const dbMock = new SequelizeMock();
    let studentModel = dbMock.define('student');

    studentModel.$queryInterface.$useHandler(function (query, queryOptions, _) {
        if (query === 'findAll') {
            if (queryOptions[0].where.email && queryOptions[0].where.email.includes('xxx@abc.com')) {
                // Result found, return it
                return [studentModel.build({id: 2, email: 'xxx@abc.com', suspend: 0})];
            } else if (queryOptions[0].where.id && queryOptions[0].where.id.includes(1)) {
                return [studentModel.build({id: 1, email: 'xyz@abc.com', suspend: 0})];
            } else {
                return [];
            }

        }
    });

    return studentModel;
})

jest.mock('../../model/teacher', () => () => {
    const SequelizeMock = require('sequelize-mock');

    // Setup the mock database connection
    const dbMock = new SequelizeMock();
    return dbMock.define('teacher', {
        id: 1,
        email: 'abc@abc.com'
    })
})

jest.mock('../../model/registry', () => () => {
    const SequelizeMock = require('sequelize-mock');

    // Setup the mock database connection
    const dbMock = new SequelizeMock();
    return dbMock.define('registry',

        {
            id: 1,
            studentId: 1,
            teacherId: 1
        }
    )
})

describe('notificationService.retrieveFromNotification()', () => {
    describe('when text has mentions', () => {
        it('get value from mock', async () => {
            result = await notificationService.retrieveForNotifications('abc@abc.com', 'welcome @xxx@abc.com');
            expect(result.length).toEqual(2);
            expect(result).toContain('xyz@abc.com')
            expect(result).toContain('xxx@abc.com')
        })
    })

    describe('when text has no mentions', () => {
        it('get value from mock', async () => {
            result = await notificationService.retrieveForNotifications('abc@abc.com', 'welcome welcome @dfsdgfd');
            expect(result.length).toEqual(1);
            expect(result[0]).toEqual('xyz@abc.com')
        })
    })
})