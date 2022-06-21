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
app.listen(3004, () => {
    app.get("/mangas", (req, res, next) => {
      connection.query(
        'SELECT * FROM `manga`',
        function(err, results, fields) {
          res.json(results);
        }
      );
    });
});