module.exports = (app, connection) => {
    app.get("/author/all", (req, res, next) => {
      connection.query(
        'SELECT * FROM `author`',
        function(err, results, fields) {
          res.json(results);
        }
      );
    });
    app.get("/author/:id", (req, res, next) => {
      connection.query(
        'SELECT * FROM `author` WHERE id=?',
        [req.params.id],
        function(err, results, fields) {
          res.json(results);
        }
      );
    });
}