const db = require("../config/config.js");

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
