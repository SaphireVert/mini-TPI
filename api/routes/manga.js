module.exports = (app, connection) => {
    /**
     * @swagger
     * /manga/{id}:
     *    get:
     *      tags:
     *      - "manga"
     *      summary: "Retrieve a simgle manga with the rank id"
     *      description: "Retrieve a manga with the specified rank id"
     *      operationId: "deleteManga"
     *      produces:
     *      - "application/xml"
     *      - "application/json"
     *      parameters:
     *      - name: "id"
     *        in: "path"
     *        description: "ID of pet to return"
     *        required: true
     *        type: "integer"
     *        format: "int64" 
     *      responses:
     *        "200":
     *          description: "successful operation"
     *          schema:
     *            $ref: "#/definitions/Manga"
     *        "400":
     *          description: "Invalid ID supplied"
     *        "404":
     *          description: "Pet not found"
     *      security:
     *      - mangastore_auth:
     *        - "write:mangas"
     *        - "read:mangas"
    */
    app.get("/manga/:id", (req, res, next) => {
      var arr = []
      connection.query( 
        'SELECT manga.id, manga.rank, manga.title, manga.start_date, manga.status FROM manga ' +
        'WHERE manga.rank = ? ',
        [req.params.id],
        function(err, results, fields) {
          var manga = results.map(x => x)
          console.log(err);
          connection.query( 
            'SELECT genre.name AS genre FROM manga ' +
            'JOIN classify ON manga.id = classify.idmanga ' +
            'JOIN genre ON genre.id = classify.idgenre ' +
            'WHERE manga.rank = ? ',
            [req.params.id],
            function(err, results, fields) {
              let genres = results.map(element => element["genre"])
              manga[0]["genres"] = genres
              console.log(manga);
              res.json(manga);
            }
          );
        }
      );
    });

    /**
     * @swagger
     * /manga:
     *    post:
     *      tags:
     *      - "manga"
     *      summary: "Add a new manga"
     *      description: ""
     *      operationId: "addManga"
     *      consumes:
     *      - "application/json"
     *      - "application/xml"
     *      produces:
     *      - "application/xml"
     *      - "application/json"
     *      parameters:
     *      - in: "body"
     *        name: "body"
     *        description: "Manga object that needs to be added to the store"
     *        required: true
     *        schema:
     *          $ref: "#/definitions/Manga"
     *      responses:
     *        "405":
     *          description: "Invalid input"
     *      security:
     *      - mangastore_auth:
     *        - "write:mangas"
     *        - "read:mangas"
    */
    app.post("/manga", (req, res, next) => {
        console.log("post")
        console.log(req.body)
        var json = req.body
        connection.query(
          'INSERT INTO manga VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [json.rank, json.title, json.status, json.start_date, json.end_date, json.synopsis, json.image_url, json.num_chapters, json.num_volumes],
          function(err, results, fields) {
            res.send(req.body);    
          }
        );
    });

    /**
     * @swagger
     * /manga:
     *    put:
     *      tags:
     *      - "manga"
     *      summary: "Modify a manga"
     *      description: ""
     *      operationId: "addManga"
     *      consumes:
     *      - "application/json"
     *      - "application/xml"
     *      produces:
     *      - "application/xml"
     *      - "application/json"
     *      parameters:
     *      - in: "body"
     *        name: "body"
     *        description: "Manga object that needs to be added to the store"
     *        required: true
     *        schema:
     *          $ref: "#/definitions/Manga"
     *      responses:
     *        "405":
     *          description: "Invalid input"
     *      security:
     *      - mangastore_auth:
     *        - "write:mangas"
     *        - "read:mangas"
    */
    app.put("/manga", (req, res, next) => {
        console.log(req.body)
        var json = req.body
        connection.query(
          'UPDATE `manga` SET `id`=?, `rank`=?, `title`=?, `status`=?, `start_date`=?, `end_date`=?, `synopsis`=?, `image_url`=?, `num_chapters`=?, `num_volumes`=? WHERE `id`=?;',
          [json.id, json.rank, json.title, json.status, json.start_date, json.end_date, json.synopsis, json.image_url, json.num_chapters, json.num_volumes, json.id],
          function(err, results, fields) {
            res.send(req.body); 
          } 
        );
    });
    /**
     * @swagger
     * /manga/{id}:
     *    delete:
     *      tags:
     *      - "manga"
     *      summary: "Add a new manga to the store"
     *      description: ""
     *      operationId: "deleteManga"
     *      produces:
     *      - "application/xml"
     *      - "application/json"
     *      parameters:
     *      - name: "id"
     *        in: "path"
     *        description: "ID of pet to return"
     *        required: true
     *        type: "integer"
     *        format: "int64" 
     *      responses:
     *        "200":
     *          description: "successful operation"
     *          schema:
     *            $ref: "#/definitions/Manga"
     *        "400":
     *          description: "Invalid ID supplied"
     *        "404":
     *          description: "Pet not found"
     *      security:
     *      - mangastore_auth:
     *        - "write:mangas"
     *        - "read:mangas"
    */
    app.delete("/manga/:id", (req, res, next) => {
        console.log(req.body)
        connection.query(
          'DELETE FROM manga WHERE id=?',
          [req.params.id],
          function(err, results, fields) {
              
          }
        );
        res.send(req.body); 
    });
}