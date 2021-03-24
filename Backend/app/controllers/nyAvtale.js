const db = require("../config/config.js");
const express = require("express");
const app = express();

//const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Funksjon som lager en ny gruppe i databasen
exports.NyAvtale = function(req, res)  {

    // Her hentes Variablene  fra frontend
    const title = req.body.title;
    const beskrivelse = req.body.beskrivelse;
 
    const start = req.body.start;
    const slutt = req.body.slutt; 
    const sted = req.body.sted;
    const opprettetav = req.body.opprettetav;
    const opprettetfor = req.body.opprettetfor;

   // var sql =  "INSERT INTO avtale (title, beskrivelse, start, slutt, sted, opprettetav, opprettetfor ) VALUES ("title" ?, ?, ?, ?, ?, ?)"
    db.query(
        "INSERT INTO avtale (title, beskrivelse, start, slutt, sted, opprettetav, opprettetfor ) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [title, beskrivelse, start, slutt, sted, opprettetav, opprettetfor], 
        (err, res) => {
        if (err) {
          console.log(err);

        } else {
            console.log(title, beskrivelse, start, slutt, sted, opprettetav, opprettetfor)
         // res.send("Values Inserted"); // tror man kan få ID'en herfra
 
        }
      }
    );
  }; // slutt på funksjon NyAvtale()

