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

  /* const items = [
    {mottaker: 2, avsender: 13, melding: 'Hei alle sammen fra Berit'},
    {mottaker: 3, avsender: 13, melding: 'Hei alle sammen fra Berit'},
    {mottaker: 4, avsender: 13, melding: 'Hei alle sammen fra Berit'}
  ]; */

  //const mottaker = 4; 
  //const avsender = req.body.avsender; // Henter avsender (den innloggede) fra frontend. Funker!
  //const melding = req.body.melding; // Henter medlingsteksen fra Frontend. Funker!

  const meldingTilAlle = `INSERT INTO melding(mottaker, avsender, melding) VALUES ?`;
  
  var values = [
    [2, 13, 'God påaske, hilsen Berit'],
    [3, 13, 'God påske, hilsen Berit'],
    [4, 13, 'God påske, hilsen Berit']
    
];
db.query(meldingTilAlle, [values], function(err) {
    if (err) throw err;
    
});
  
  // db.query(meldingTilAlle, [mottaker, avsender, melding], (err,result) => {
  // db.query(meldingTilAlle, [items.map(item => [item.mottaker, item.avsender, item.melding])], (err,result) => {
    /* if (err) {
      console.log(err)
    }
    else{
      res.send(result);
    }
  });
}; */

};


// Funksjon som sender melding til ALLE brukerne i en GRUPPE
exports.Gruppemelding = function(req, res) {

  // Liste med alle meldingene
  const medlemmer = [
    [13, 13, 'Melding til alle fra Berit'],
    [3, 13, 'Melding til alle fra Berit'],
    [4, 13, 'Melding til alle fra Berit']
  ];
  const meldingTilMedlemmer = `INSERT INTO melding(mottaker, avsender, melding) VALUES (?, ?, ?)`;
  db.query(meldingTilMedlemmer, [medlemmer], (err,result) => {
    if (err) {
      console.log(err)
    }
    else{
      res.send(result);
    }
  });
};


