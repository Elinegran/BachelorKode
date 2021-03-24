const db = require("../config/config.js");


// Funksjon som henter alle meldingene som en bruker har fått (her Knut)
exports.getKalenderAlle = function(req, res)  {

    const hentAlleAvtaler = `select * from avtale;`;

    db.query(hentAlleAvtaler, (err, result) => {
      if (err) {
        console.log(err)
      } 
      else {
        res.send(result);
        }
      });
};

