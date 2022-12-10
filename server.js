const express = require('express');
require('dotenv').config();
const { PORT } = process.env
const routes = [require('./route/register')
    ,require('./route/commonstudents')
    ,require('./route/suspend')
    ,require('./route/retrievefornotifications')

]

const app = express();

app.use(express.json());

app.use('/api',routes)

app.use((err, req, res, _) => {
    res.status(500);
    res.send({
        message: err.message,
        errors: err.errors,
    });
})

var server = app.listen(PORT, function () {
    var port = server.address().port

    console.log("App listening at %s", port)
})