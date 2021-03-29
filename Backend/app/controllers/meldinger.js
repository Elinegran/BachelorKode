const db = require("../config/config.js");

//Funksjon som skal sende meldinger til chat og havne i innboks 
exports.InsertInnboksMeldinger = function(req, res) {

  const mottaker = req.body.mottaker;
  const avsender = req.body.avsender;
  const melding = req.body.melding;
  
  const LeggtilInnboksMeldinger = `INSERT INTO melding(mottaker, avsender, melding) VALUES (?, ?, ?)`;
  db.query(LeggtilInnboksMeldinger, [mottaker, avsender, melding], (err,result) => {
    if (err) {
      console.log(err)
    }
    else{
      res.send(result);
    }
  });
};


// Funksjon som henter alle meldingene som en bruker har fått (her Knut)
exports.getMineMeldinger = function(req, res)  {

    const hentMineMeldinger = `SELECT meldingsID, avsender, mottaker, tid, fornavn, etternavn, melding
                               FROM melding, bruker
                               WHERE mottaker = 3
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

