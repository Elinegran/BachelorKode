const db = require("../config/config.js");
const express = require("express");
const app = express();

//const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Funksjon som lagrer et nytt gruppemedlem i databasen
exports.MedlemInput = function(req, res)  {

  // Henter gruppeID og brukerID fra frontend
  const brukerID = req.body.idbruker
  const gruppeID = req.body.gruppeID
  
  db.query(
    "INSERT INTO gruppemedlem VALUES (?,?)",
    brukerID, gruppeID, 
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //res.send("Values Inserted"); // tror man kan få ID'en herfra
      }
    }
  );
}; // slutt på funksjon MedlemsInput()

