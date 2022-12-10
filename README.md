# Teacher Admin NodeJS Service

# Prerequisite

1) MySQL (Tested working on version 8.0.31-1.el8)
2) NodeJS (Tested on 14.18.1)
3) npm (Tested on 8.1.1)

## Setup

1) Run `source db/teacher_admin.sql` with appropriate user with database creation privileges on mysql console
2) Edit `.env` file based on the database settings of setup database.
3) Run `node server.js`. (You should be able to see App listening at 8080)
4) Run api calls using `TeacherAdmin.postman_collection.json` using Postman
5) Run unit tests using `npm run test`

## Assumptions

1) `/api/register` creates new teacher or student if either does not exist in database
2) All request related errors are returned with status code 400
3) All database related errors (including email that does not exists) are returned with status code 500

## Dependencies Used for Dev

1) ExpressJS (http://expressjs.com/)
2) MySQL2 (https://github.com/sidorares/node-mysql2#readme)
3) Sequelize (https://sequelize.org/)
4) Joi (https://joi.dev/)

## Dependencies Used for Unit Test

1) Jest (https://jestjs.io/)
2) Sequelize-Mock (https://sequelize-mock.readthedocs.io/en/stable/)
