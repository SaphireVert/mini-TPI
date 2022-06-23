module.exports = (app, connection) => {
    app.get("/genre/all", (req, res, next) => {
      connection.query(
        'SELECT * FROM `genre`',
        function(err, results, fields) {
          res.json(results);
        }
      );
    });
    app.get("/genre/:id", (req, res, next) => {
      connection.query(
        'SELECT * FROM `genre` WHERE id=?',
        [req.params.id],
        function(err, results, fields) {
          res.json(results);
        }
      );
    });
}