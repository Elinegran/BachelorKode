const db = require("../config/config.js");
const express = require("express");
const app = express();

//const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Henter ALLE lenkene fra Databasen
exports.getAlleLenker = function(req, res)  {
    const sqlSelect = "SELECT * FROM lenke; ";
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
    const lenke = req.body.lenkenavn
    


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

