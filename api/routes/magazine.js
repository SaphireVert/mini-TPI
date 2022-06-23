module.exports = (app, connection) => {
    app.get("/magazine/all", (req, res, next) => {
      connection.query(
        'SELECT * FROM `magazine`',
        function(err, results, fields) {
          res.json(results);
        }
      );
    });
    app.get("/magazine/:id", (req, res, next) => {
      connection.query(
        'SELECT * FROM `magazine` WHERE id=?',
        [req.params.id],
        function(err, results, fields) {
          res.json(results);
        }
      );
    });
}