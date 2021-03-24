const db = require("../config/config.js");

exports.getAll = function(req, res)  {
    const sqlSelect = "SELECT * FROM bruker";
    db.query(sqlSelect, (err, result) => {
      if (err) {
        console.log(err)
      } 
      else {
        res.send(result);
        }
      });
};
