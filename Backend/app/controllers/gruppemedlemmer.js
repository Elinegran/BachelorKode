const db = require("../config/config.js");



// Henter medlemmene til en gruppe
exports.getMedlem = function(req, res)  {
  const gruppeID = 2; //req.body.gruppeID; 
  console.log(gruppeID); 

    const sqlSelect = `SELECT gruppemedlem.gruppeID, gruppenavn, gruppemedlem.idbruker, fornavn, etternavn  
                       FROM gruppemedlem, gruppe, bruker
                       WHERE gruppemedlem.gruppeID = ?
                       AND gruppemedlem.gruppeID = gruppe.gruppeID
                       AND gruppemedlem.idbruker = bruker.idbruker;`;
    
    db.query(sqlSelect, [gruppeID], (err, result) => {
      if (err) {
        console.log(err)
      } 
      else {
        res.send(result);
        }
      });
};
