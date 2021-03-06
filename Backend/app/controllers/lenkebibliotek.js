const db = require("../config/config.js");
const express = require("express");
const app = express();


const cors = require("cors");

app.use(cors());
app.use(express.json());

// Henter ALLE lenkene fra Databasen
exports.getAlleLenker = function(req, res)  {
    const sqlSelect = `SELECT DISTINCT * 
                       FROM lenke 
                       WHERE url IS NOT NULL
                       ORDER BY tittel;` ;
    db.query(sqlSelect, (err, result) => {
      if (err) {
        console.log(err)
      } 
      else {
        res.send(result);
        }
      });
};

// Legger til en ny lenke i databasen
exports.LenkeInput = function(req, res)  {

    // Her hentes lenkenavn fra frontend
    const url = req.body.url;
    const tittel = req.body.tittel;
    const info = req.body.info;


  const LeggTilLenke = `INSERT INTO lenke(url, tittel, info) VALUES (?, ?, ?)`;
  db.query(LeggTilLenke, [url, tittel, info], (err,result) => {
    if (err) {
      console.log(err)
    }
    else{
      res.send(result);
    }
  });
};


// Legger til en lenke hos en bruker

exports.AddLenkeBruker = function(req, res)  {
  const idbruker = req.body.idbruker;
  const lenkeID = req.body.lenkeID;
  // console.log("idbruker" + idbruker);
  // console.log("lenkeID" + lenkeID);
const LeggTilBruker = `INSERT INTO lenkebruker(idbruker, lenkeID) VALUES (?, ? )`;
db.query(LeggTilBruker, [idbruker, lenkeID], (err,result) => {
  if (err) {
    console.log(err)
  }
  else{
    res.send(result);
  }
});
}; 

// legge til en lenke i en gruppe
exports.AddLenkeGruppe = function(req, res)  {
  const lenkeID = req.body.lenkeID;
  console.log ("lenkeID legg til alle brukere" + lenkeID);
  const sqlSelect = 
                  `INSERT INTO lenkebruker (idbruker, lenkeID)
                  SELECT DISTINCT gruppemedlem.idbruker, ?
                  FROM gruppemedlem 
                  WHERE gruppeID = ?`;
  db.query(sqlSelect, lenkeID,(err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
      }
    });
};

// INSERT INTO lenkebruker (lenkeID, idbruker)  
//                   SELECT DISTINCT ?, bruker.idbruker ? = lenkeID
//                   FROM bruker, gruppemedlem
//                   WHERE bruker.idbruker = gruppemedlem.idbruker
//                   AND gruppemedlem.gruppeID = ?




// Funksjonen som henter alle lenkene som en bruker har f??tt
exports.VisBrukerLenker = function(req, res)  {
  const idbruker = req.query.idbruker;
  // console.log (idbruker);
  const sqlSelect = 
                  `SELECT DISTINCT lenke.lenkeID, url, tittel, info, bruker.idbruker, fornavn, etternavn
                  FROM lenke, bruker, lenkebruker
                  WHERE lenke.lenkeID = lenkebruker.lenkeID 
                  AND lenkebruker.idbruker = bruker.idbruker
                  AND bruker.idbruker = ?
                  ORDER BY tittel`;
  db.query(sqlSelect, idbruker, (err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
      }
    });
};

// SELECT bruker.Idbruker

//Funksjon med alle gruppene som har en bestemt lenke

// exports.HentGruppeLenker = function(req, res)  {
//   const lenkeID = req.query.lenkeID;
//   console.log (lenkeID);
//   const sqlSelect = 
//                   `SELECT DISTINCT lenke.lenkeID, url, tittel, info, gruppe.gruppeID, gruppenavn
//                   FROM lenke, gruppe, lenkebruker, gruppemedlem
//                   WHERE lenke.lenkeID = lenkebruker.lenkeID 
//                   AND lenkebruker.idbruker = gruppemedlem.idbruker
//                   AND gruppemedlem.gruppeID = gruppe.gruppeID
//                   AND lenke.lenkeID = ?`;
//   db.query(sqlSelect, lenkeID, (err, result) => {
//     if (err) {
//       console.log(err)
//     } 
//     else {
//       res.send(result);
//       }
//     });
// };

// alle lenkene som en gruppe har
exports.VisGruppeLenker = function(req, res)  {
  const gruppeID = req.query.gruppeID;
  // console.log (gruppeID);
  const sqlSelect = 
                  `SELECT DISTINCT lenke.lenkeID, url, tittel, info, gruppe.gruppeID, gruppenavn
                  FROM lenke, gruppe, lenkebruker, gruppemedlem
                  WHERE lenke.lenkeID = lenkebruker.lenkeID 
                  AND lenkebruker.idbruker = gruppemedlem.idbruker
                  AND gruppemedlem.gruppeID = gruppe.gruppeID
                  AND gruppe.gruppeID = ?`;
  db.query(sqlSelect, gruppeID, (err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
      }
    });
};


// Slette en lenke hos en bruker
exports.SlettBrukerLenke = function(req, res)  {
  const lenkeID = req.body.lenkeID;
  const idbruker = req.body.idbruker;
  // console.log ("idbruker" + idbruker);
  // console.log ("lenkeID" + lenkeID);
  const sqlSelect = 
                  `DELETE FROM lenkebruker
                   WHERE lenkeID = ? AND idbruker = ?`;
  db.query(sqlSelect, [lenkeID, idbruker],(err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
      }
    });
};

// Endre redigere en lenke !
exports.RedigerLenke = function(req, res)  {
  const lenkeID = req.body.lenkeID;
  const nyUrl = req.body.url;
  const nyTittel = req.body.tittel;
  const nyInfo = req.body.info;
  // console.log ("url" + nyUrl);
  // console.log ("tittel" + nyTittel);
  // console.log ("info" + nyInfo);
  // console.log ("lenkeID" + lenkeID);
  const sqlSelect = 
                `UPDATE lenke 
                SET url = ?, tittel = ?, info = ?
                WHERE lenkeID = ?`;
  db.query(sqlSelect, [ nyUrl, nyTittel, nyInfo, lenkeID],(err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
      }
    });
};


// Slette en lenke for en gruppe VIRKER IKKE!
exports.SlettGruppeLenke
 = function(req, res)  {
  const lenkeID = req.body.lenkeID;
  const idbruker = req.body.idbruker;
  // console.log ("idbruker" + idbruker);
  // console.log ("lenkeID" + lenkeID);
  const sqlSelect = 
                  ``;
  db.query(sqlSelect, [lenkeID, idbruker],(err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
      }
    });
};


// legge til en lenke hos alle brukerne
exports.LeggTilAlleLenke = function(req, res)  {
  const lenkeID = req.body.lenkeID;
  console.log ("lenkeID legg til alle brukere" + lenkeID);
  const sqlSelect = 
                  `INSERT INTO lenkebruker (idbruker, lenkeID)
                  SELECT bruker.idbruker, ?
                  FROM bruker;`;
  db.query(sqlSelect, lenkeID,(err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
      }
    });
};

//Brukeren kan se alle lenkne sine

exports.LenkerBruker = function(req, res)  {
  const lenkeID = req.body.lenkeID;
  console.log ("lenkeID legg til alle brukere" + lenkeID);
  const sqlSelect = 
                  `SELECT * FROM lenke, lenkebruker
                  WHERE lenkebruker.idbruker = 13
                  AND lenkebruker.lenkeID = lenke.lenkeID
                  ORDER BY tittel;`;
  db.query(sqlSelect, lenkeID,(err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
      }
    });
};
// Se alle brukerne som har en lenke

// Sp??rring 
/* // Opprette en lenke for en gruppe: 
-- Opprette en lenke for en gruppe: 
INSERT INTO lenkebruker (lenkeID, idbruker)  
SELECT DISTINCT ?, bruker.idbruker // ? = lenkeID
FROM bruker, gruppemedlem
WHERE bruker.idbruker = gruppemedlem.idbruker
AND gruppemedlem.gruppeID = ?; // ? = gruppeID
 */









// db.query(
//   "INSERT INTO lenke (url) VALUES (?)",
//   lenke,
//   (err, res) => {
//     if (err) {
//       console.log(err);
//     } else {
//       //res.send("Values Inserted"); // tror man kan f?? ID'en herfra
//     }
//   }
// );
// }; // slutt p?? funksjon GruppeInput()

