const db = require("../config/config.js");

// Henter alle gruppene fra Databasen
exports.getMineGrupper = function(req, res)  {
    const sqlSelect = "SELECT * FROM gruppe WHERE gruppenavn IS NOT NULL";
    db.query(sqlSelect, (err, result) => {
      if (err) {
        console.log(err)
      } 
      else {
        res.send(result);
        }
      });
};

// Henter gruppene til en bestemt bruker fra DB
exports.hentMineGrupper = function(req, res)  {
  let idbruker = req.query.idbruker;

  const sqlSelect = "SELECT * FROM gruppe WHERE idbruker = ?";
  db.query(sqlSelect, [idbruker], (err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
      }
    });
};
