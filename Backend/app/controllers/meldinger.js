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


// Funksjon som henter alle meldingene som en bruker har fått
exports.getMineMeldinger = function(req, res)  {
  let idbruker = req.query.idbruker;
    const hentMineMeldinger = `SELECT meldingsID, avsender, mottaker, tid, fornavn, etternavn, melding
                               FROM melding, bruker
                               WHERE mottaker = ?
                               AND idbruker = avsender
                               ORDER BY tid DESC`;

    db.query(hentMineMeldinger, [idbruker], (err, result) => {
      if (err) {
        console.log(err)
      } 
      else {
        res.send(result);
        }
      });
};

//Funksjon som henter en samtale mellom to brukere
exports.getMinSamtale = function(req, res)  {
  let idbruker = req.query.idbruker;
  let avsender = req.query.avsender; 
  
    const hentMinSamtale = `SELECT tid, fornavn, etternavn, melding 
                            FROM bruker, melding 
                            WHERE melding.avsender = bruker.idbruker 
                            AND (avsender = ? OR avsender = ?) 
                            AND (mottaker = ? OR mottaker = ?) 
                            
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

