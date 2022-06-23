var express = require("express");

const mysql = require('mysql2');


const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_NAME,
};

const connection = mysql.createConnection(config);

var app = express();
app.use(express.json());
app.listen(3004, () => {
    require('./routes/manga')(app, connection)
    require('./routes/author')(app, connection)
    require('./routes/genre')(app, connection)
    require('./routes/magazine')(app, connection)
});