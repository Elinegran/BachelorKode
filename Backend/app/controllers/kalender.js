const db = require("../config/config.js");
const express = require("express");
const app = express();

//const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());


// Funksjon som henter alle meldingene som en bruker har fått (her Knut)
exports.getKalenderAlle = function(req, res)  {

    const hentAlleAvtaler = `select * from avtale;`;

    db.query(hentAlleAvtaler, (err, result) => {
      if (err) {
        console.log(err)
      } 
      else {
        res.send(result);
        }
      });
};

//Legger til ny avtale
exports.NyAvtale = function(req, res)  {

  // Her hentes Variablene  fra frontend
  const title = req.body.title;
  const beskrivelse = req.body.beskrivelse;

  const start = req.body.start;
  const end = req.body.end; 
  const sted = req.body.sted;
  const opprettetav = req.body.opprettetav;
  const opprettetfor = req.body.opprettetfor;

 // var sql =  "INSERT INTO avtale (title, beskrivelse, start, end, sted, opprettetav, opprettetfor ) VALUES ("title" ?, ?, ?, ?, ?, ?)"
  db.query(
      "INSERT INTO avtale (title, beskrivelse, start, end, sted, opprettetav, opprettetfor ) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, beskrivelse, start, end, sted, opprettetav, opprettetfor], 
      (err, res) => {
      if (err) {
        console.log(err);

      } else {
          console.log(title, beskrivelse, start, end, sted, opprettetav, opprettetfor)
          console.log(res.insertId);
       // res.send("Values Inserted"); // tror man kan få ID'en herfra

      }
    }
  );
}; // slutt på funksjon NyAvtale()


//UPDATE tid
exports.UpdateTid = function(req, res)  {

  // Her hentes Variablene  fra frontend 
  const start = req.body.start;
  const end = req.body.end; 
  const title = req.body.title;
  const gstart = req.body.gstart;
  const opprettetfor = req.body.opprettetfor;
 

 // var sql =  "INSERT INTO avtale (title, beskrivelse, start, end, sted, opprettetav, opprettetfor ) VALUES ("title" ?, ?, ?, ?, ?, ?)"
  db.query(
      "UPDATE avtale SET start = ?, end = ? WHERE title = ? AND start = ? AND opprettetfor = ?",
      [start, end, title, gstart, opprettetfor], 
      (err, res) => {
      if (err) {
        console.log(err);

      } else {
          console.log(start, end, title, gstart, opprettetfor)
       // res.send("Values Inserted"); // tror man kan få ID'en herfra

      }
    }
  );
}; // slutt på funksjon NyAvtale()


