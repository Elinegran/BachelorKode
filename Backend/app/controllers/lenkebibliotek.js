const db = require("../config/config.js");
const express = require("express");
const app = express();


const cors = require("cors");

app.use(cors());
app.use(express.json());

// Henter ALLE lenkene fra Databasen
exports.getAlleLenker = function(req, res)  {
    const sqlSelect = "SELECT * FROM lenke WHERE url IS NOT NULL; ";
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

  // Her hentes lenkenavn fra frontend
  const idbruker = req.body.idbruker;
  const lenkeID = req.body.lenkeID;
  console.log("idbruker" + idbruker);
  console.log("lenkeID" + lenkeID);
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



// Funksjonen som henter alle lenkene som en bruker har fått
exports.VisBrukerLenker = function(req, res)  {
  const idbruker = req.query.idbruker;
  console.log (idbruker);
  const sqlSelect = 
                  `SELECT DISTINCT lenke.lenkeID, url, tittel, info, bruker.idbruker, fornavn, etternavn
                  FROM lenke, bruker, lenkebruker
                  WHERE lenke.lenkeID = lenkebruker.lenkeID 
                  AND lenkebruker.idbruker = bruker.idbruker
                  AND bruker.idbruker = ?`;
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
  console.log (gruppeID);
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
  console.log ("idbruker" + idbruker);
  console.log ("lenkeID" + lenkeID);
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



// Slette en lenke, slettes da for alle brukerne som har denne lenken

// Se alle brukerne som har en lenke

// Spørring 
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
//       //res.send("Values Inserted"); // tror man kan få ID'en herfra
//     }
//   }
// );
// }; // slutt på funksjon GruppeInput()

