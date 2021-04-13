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
    const hentMineMeldinger = `SELECT meldingsID, avsender, mottaker, tid, meldingLest, fornavn, etternavn, melding
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
  
    const hentMinSamtale = `SELECT DISTINCT tid, fornavn, etternavn, melding, meldingLest
                            FROM bruker, melding 
                            WHERE melding.avsender = bruker.idbruker 
                            AND (avsender = ? OR avsender = ?) 
                            AND (mottaker = ? OR mottaker = ?) 
                            ORDER BY tid DESC`;

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

  const meldingTilAlle = `INSERT INTO melding(mottaker, avsender, melding) 
                          SELECT bruker.idbruker, ?, ?
                          FROM bruker`;

  var avsender = req.body.avsender; // Henter avsender (den innloggede) fra frontend
  var melding = req.body.melding; // Henter medlingsteksen fra Frontend
 
  db.query(meldingTilAlle, [avsender, melding], (err,result) => {
    if (err) throw err;    
   });
 
}; // Slutt på funksjon meldingTilAlle()


// Funksjon som sender melding til ALLE brukerne i en GRUPPE
exports.Gruppemelding = function(req, res) {

  const meldingTilMedlemmer = `INSERT INTO melding(mottaker, avsender, melding)
                               SELECT gruppemedlem.idbruker, ?, ?
                               FROM gruppemedlem
                               WHERE gruppemedlem.gruppeID = ?;`;

  const avsender = req.body.avsender; // Henter avsender fra frontend. 
  const melding = req.body.melding; // Henter meldingsteksen fra Frontend.
  const gruppeID = req.body.gruppeID; //Henter gruppeID fra frontend.

  console.log(gruppeID);

   db.query(meldingTilMedlemmer, [avsender, melding, gruppeID], (err,result) => {
    if (err) throw err;    
   });
}; //Slutt på meldingTilMedlemmer funksjonen


// Funksjon som oppdaterer en rad til NÅR en melding er lest
exports.MeldingLest = function(req, res) {

  const meldingsID = req.body.meldingsID; 
  console.log(meldingsID); 

  const meldingLest = `UPDATE melding 
                       SET meldingLest = CURRENT_TIMESTAMP()
                       WHERE meldingsID = ?`;

  db.query(meldingLest, meldingsID, (err,result) => {
    if (err) {
      console.log(err)
    }
    else{
      res.send(result);
    }
  });
};

// Teller hvor mange nye medlinger en bruker har fått 
exports.AntallNyeMeldinger = function(req, res)  {
  let mottaker = req.query.idbruker;
  
    const antallNye = `SELECT COUNT(meldingsID) AS AntallNyeMeldinger
                       FROM melding
                       WHERE mottaker = ?
                       AND meldingLest = '0000-00-00 00:00:00' `;

    db.query(antallNye, mottaker, (err, result) => {
      if (err) {
        console.log(err)
      } 
      else {
        res.send(result);
        }
      });
}; 
