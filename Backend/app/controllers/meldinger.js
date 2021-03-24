const db = require("../config/config.js");


// Funksjon som henter alle meldingene som en bruker har fått (her Knut)
exports.getMineMeldinger = function(req, res)  {

    const hentMineMeldinger = `SELECT avsender, tid, fornavn, etternavn, melding
                               FROM melding, bruker
                               WHERE mottaker = 2
                               AND idbruker = avsender
                               ORDER BY tid DESC`;

    db.query(hentMineMeldinger, (err, result) => {
      if (err) {
        console.log(err)
      } 
      else {
        res.send(result);
        }
      });
};

