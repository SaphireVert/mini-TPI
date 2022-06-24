module.exports = (app, connection) => {
    /**
     * @swagger
     * /manga/:id:
     *   get:
     *     summary: Retrieve a simgle manga with the rank id
     *     description: Retrieve a manga with the specified rank id
    */
    app.get("/manga/:id", (req, res, next) => {
      var arr = []
      connection.query( 
        'SELECT manga.rank, manga.title, manga.start_date, manga.status FROM manga ' +
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