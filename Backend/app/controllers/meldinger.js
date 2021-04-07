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

// Funksjon som sender melding til ALLE brukerne
exports.MeldingTilAlle = function(req, res) {

  const meldingTilAlle = `INSERT INTO melding(mottaker, avsender, melding) VALUES ?`;
  
  var mottaker = [2,3,4];
  var avsender = req.body.avsender; // Henter avsender (den innloggede) fra frontend. Funker!
  var melding = req.body.melding; // Henter medlingsteksen fra Frontend. Funker!
 
  // Dette formatet funker!
  /* var brukere = [
    [2, avsender, melding],
    [3, avsender, melding],
    [4, avsender, melding] 
  ]; */

  var brukere = mottaker.map(bruker => [bruker.mottaker, avsender, melding]);
  console.log(brukere); 

  //var liste = brukere.map (mottaker => [mottaker.mottakere, mottaker.avsender, mottaker.melding ] ); 

  /* db.query(meldingTilMedlemmer, [mottaker, avsender, melding], (err,result) => {
    if (err) {
      console.log(err)
    }
    else{
      res.send(result);
    }
  }); */

  // Legger alle meldingene inn i DB (Denne funker!)
  db.query(meldingTilAlle, [brukere], function(err) {
      if (err) throw err;   
  });
  
}; // Slutt på funksjon meldingTilAlle()


// Funksjon som sender melding til ALLE brukerne i en GRUPPE
exports.Gruppemelding = function(req, res) {

  const meldingTilMedlemmer = `INSERT INTO melding(mottaker, avsender, melding)
                               SELECT gruppemedlem.idbruker, ?, ?
                               FROM gruppemedlem
                               WHERE gruppemedlem.gruppeID = 40;`;



  // const mottaker = [13,11];
  const avsender = req.body.avsender; // Henter avsender (den innloggede) fra frontend. Funker!
  const melding = req.body.melding; // Henter medlingsteksen fra Frontend. Funker!

  // const medlemmer = mottaker.map(bruker => [bruker.mottaker, avsender, melding]);
  // console.log(medlemmer); 

  // Liste med alle meldingene
  // const medlemmer = [
  //   [13, 13, 'Sommerferie snart, fra Berit'],
  //   [4, 13, 'Sommerferie snart, fra Berit']
  // ];
  // const meldingTilMedlemmer = `INSERT INTO melding(mottaker, avsender, melding) VALUES ?`;
   db.query(meldingTilMedlemmer, [avsender, melding], (err,result) => {
    if (err) throw err;    
   });
};


