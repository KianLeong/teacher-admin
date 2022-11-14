const express = require('express');
const routes = [require('./route/register')
    ,require('./route/commonstudents')
    ,require('./route/suspend')
    ,require('./route/retrievefornotifications')

]

const app = express();

app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello World');
})

app.use('/api',routes)

app.use((err, req, res, _) => {
    res.status(500);
    res.send({
        message: err.message,
        errors: err.errors,
    });
})

var server = app.listen(8080, function () {
    var port = server.address().port

    console.log("App listening at %s", port)
})