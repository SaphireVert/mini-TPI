module.exports = (app, connection) => {
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
        connection.query(
          'INSERT INTO manga VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [7, "title", "finished", "1994-12-05", "1994-12-05", "lorem ipsum", "url", 7, 5],
          function(err, results, fields) {
            res.send(["err", "fdehjidifhj"]);    
          }
        );
    });

    app.put("/manga/:id", (req, res, next) => {
        console.log(req.body)
        connection.query(
        'UPDATE manga SET rank=?, WHERE id=?',
          function(err, results, fields) {
              
          }
        );
        res.send(req.body); 
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