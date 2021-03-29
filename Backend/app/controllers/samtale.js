const db = require("../config/config.js");

// Funksjon som henter samtalen mellom 2 brukere (her Knut og Per) den nyeste nederst
exports.getMinSamtale = function(req, res)  {
  let idbruker = req.query.idbruker;
  let avsender = req.query.avsender; 
    const hentMinSamtale = `SELECT tid, fornavn, melding 
                            FROM bruker, melding 
                            WHERE melding.avsender = bruker.idbruker 
                            AND (avsender = ? OR avsender = ?) 
                            AND (mottaker = ? OR mottaker = ?) 
                            AND (avsender != mottaker) 
                            ORDER BY tid`;

    db.query(hentMinSamtale, [avsender, idbruker, idbruker, avsender], (err, result) => {
      if (err) {
        console.log(err)
      } 
      else {
        res.send(result);
        }
      });
}; 