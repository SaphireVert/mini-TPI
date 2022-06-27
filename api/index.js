var express = require("express"),
    bodyParser = require("body-parser"),
    swaggerJsdoc = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express");
    const mysql = require('mysql2');
var cors = require('cors');
  

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_NAME,
};

const connection = mysql.createConnection(config);


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Swagger API',
    version: '1.0.0',
    description:
      'This is a REST API',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Github repos',
      url: 'https://github.com/SaphireVert/mini-TPI',
    },
  },
  servers: [
    {
      url: 'http://localhost:3004',
      description: 'Development server',
    },
  ],
  definitions: {
        Manga:{
          type: "object",
          required:
          - "title",
          properties:{
            rank:
              {type: "integer",
              example: 99},
            title:
              {type: "string",
              example: "doggie"},
            status:{
              type: "string",
              example: "finished"},
            start_date:{
              type: "string",
              example: "1994-12-05"},
            end_date:{
              type: "string",
              example: "1994-12-05"},
            synopsis:{
              type: "string"},
            image_url:{
              type: "string"},
            num_chapters:{
              type: "integer"},
            num_volumes:{
              type: "integer"}}}
  }
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);


var app = express();
app.use(cors());

app.use(express.json());
app.listen(3004, () => {
    app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(specs)
    );
    app.get("/api-docs.json", (req, res, next) => {
        res.json(specs);
    });
    require('./routes/manga')(app, connection)
    require('./routes/author')(app, connection)
    require('./routes/genre')(app, connection)
    require('./routes/magazine')(app, connection)
});