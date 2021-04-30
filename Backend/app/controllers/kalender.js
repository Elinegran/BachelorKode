const db = require("../config/config.js");
const express = require("express");
const app = express();

//const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());


// Funksjon som henteravtaler
exports.getKalenderAlle = function(req, res)  {

    const hentAlleAvtaler = `select * from avtale order by start;`;

    db.query(hentAlleAvtaler, (err, result) => {
      if (err) {
        console.log(err)
      } 
      else {
        res.send(result);
        }
      });
};

// Funksjon som henteravtaler
exports.getKalenderBruker = function(req, res)  {

  let enBruker = req.query.enBruker;

  const hentEnBruker = `select * from avtale where opprettetfor = ?;`;

  db.query(hentEnBruker, enBruker, (err, result) => {
    if (err) {
      console.log(err)
      console.log('Dette er SQL: ' + hentEnBruker + enBruker)
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

exports.NyGruppeAvtale = function(req, res)  {

  // Her hentes Variablene  fra frontend
  const title = req.body.title;
  const beskrivelse = req.body.beskrivelse;

  const start = req.body.start;
  const end = req.body.end; 
  const sted = req.body.sted;
  const opprettetav = req.body.opprettetav;
  const gruppeId = req.body.gruppeId;
 

  const gruppeAvtale = `INSERT INTO avtale(title, beskrivelse, start, end, sted, opprettetav, opprettetfor)
	                      SELECT ?, ?,?, ?,? , ?, gruppemedlem.idbruker
                        FROM gruppemedlem
                        WHERE gruppemedlem.gruppeID = ?`


 // var sql =  "INSERT INTO avtale (title, beskrivelse, start, end, sted, opprettetav, opprettetfor ) VALUES ("title" ?, ?, ?, ?, ?, ?)"
  db.query(gruppeAvtale, [title, beskrivelse, start, end, sted, opprettetav, gruppeId], 
      (err, res) => {
      if (err) {
        console.log(err);
        console.log(title, beskrivelse, start, end, sted, opprettetav, gruppeId)

      } else {
          console.log(title, beskrivelse, start, end, sted, opprettetav, gruppeId)
          console.log(res.insertId);
       // res.send("Values Inserted"); // tror man kan få ID'en herfra

      }
    }
  );
}; // slutt på funksjon NyGruppeAvtale()




//UPDATE tid
exports.UpdateTid = function(req, res)  {
  console.log("nå er du her");
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
        console.log(start, end, title, gstart, opprettetfor)

      } else {
          console.log(start, end, title, gstart, opprettetfor)
       // res.send("Values Inserted"); // tror man kan få ID'en herfra

      }
    }
  );
}; // slutt på funksjon UPdate Tid


//UPDATE AVTALE
exports.updateAvtale = function(req, res){
  console.log("nå er du i updateAVtale");

  //Variabler hentes fra frontend:
  const id = req.body.id;
  const title = req.body.title;
  const beskrivelse = req.body.beskrivelse;
  const sted = req.body.sted;
  const start = req.body.start;
  const slutt = req.body.slutt;

  db.query(
    "UPDATE avtale SET title = ?, beskrivelse = ?, sted = ?, start = ?, end = ? WHERE id = ?",
    [title, beskrivelse, sted, start, slutt, id], 
    (err, res) => {
    if (err) {
      console.log(err);
      console.log(title, beskrivelse, sted, start, slutt, id)

    } else {
        console.log(title, beskrivelse, sted, start, slutt, id)
     // res.send("Values Inserted"); // tror man kan få ID'en herfra

    }
  }
);

};// slutt på update avtale


//Sletter en avtale
exports.deleteAvtale = function(req, res)  {

  const id = req.body.avtaleid;
  const slett = 'DELETE FROM avtale WHERE id  = ?';

  db.query(slett, id,(err, res) => {
    if (err) {
      console.log(err)
      console.log(id)
    } 
    else {
     console.log("Sletting velykket");
      }
    });
};
