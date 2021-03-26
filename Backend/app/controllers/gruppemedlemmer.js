const db = require("../config/config.js");

exports.getMedlem = function(req, res)  {
    const sqlSelect = `SELECT gruppemedlem.gruppeID, gruppenavn, gruppemedlem.idbruker, fornavn, etternavn  
                       FROM gruppemedlem, gruppe, bruker
                       WHERE gruppemedlem.gruppeID = 2
                       AND gruppemedlem.gruppeID = gruppe.gruppeID
                       AND gruppemedlem.idbruker = bruker.idbruker;`;
    
    db.query(sqlSelect, (err, result) => {
      if (err) {
        console.log(err)
      } 
      else {
        res.send(result);
        }
      });
};
