const db = require("../config/config.js");
const express = require("express");
const app = express();

//const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());


// Henter medlemmene til en gruppe
exports.getMedlem = function(req, res)  {
  let gruppeID = req.query.gruppeID; 
  console.log("Gruppeid: " + gruppeID); 

    const sqlSelect = `SELECT gruppemedlem.gruppeID, gruppenavn, gruppemedlem.idbruker, fornavn, etternavn  
                       FROM gruppemedlem, gruppe, bruker
                       WHERE gruppemedlem.gruppeID = ?
                       AND gruppemedlem.gruppeID = gruppe.gruppeID
                       AND gruppemedlem.idbruker = bruker.idbruker;`;
    
    db.query(sqlSelect, gruppeID, (err, result) => {
      if (err) {
        console.log(err)
      } 
      else {
        res.send(result);
        }
      });
};
