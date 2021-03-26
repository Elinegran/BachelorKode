const db = require("../config/config.js");

// Funksjon som henter samtalen mellom 2 brukere (her Knut og Per) den nyeste nederst
exports.getMinSamtale = function(req, res)  {
     
    const hentMinSamtale = `SELECT tid, fornavn, melding 
                            FROM bruker, melding 
                            WHERE melding.avsender = bruker.idbruker 
                            AND (avsender = 2 OR avsender = 3) 
                            AND (mottaker = 2 OR mottaker = 3) 
                            AND (avsender != mottaker) 
                            ORDER BY tid`;

    db.query(hentMinSamtale, (err, result) => {
      if (err) {
        console.log(err)
      } 
      else {
        res.send(result);
        }
      });
}; 