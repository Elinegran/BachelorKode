const db = require("../config/config.js");
const express = require("express");
const app = express();

//const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Henter ALLE gruppene fra Databasen
exports.getMineGrupper = function(req, res)  {
    const sqlSelect = "SELECT * FROM gruppe WHERE gruppenavn IS NOT NULL";
    db.query(sqlSelect, (err, result) => {
      if (err) {
        console.log(err)
      } 
      else {
        res.send(result);
        }
      });
};

// Henter gruppene til EN BESTEMT BRUKER fra DB
exports.hentBrukerGrupper = function(req, res)  {
  let idbruker = req.query.idbruker;

  const sqlSelect = "SELECT * FROM gruppe WHERE idbruker = ?";
  db.query(sqlSelect, [idbruker], (err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
      }
    });
}; // slutt på funksjon hent brukerGrupper

// Legger til en NY GRUPPE i databasen
exports.GruppeInput = function(req, res)  {

  // Her hentes gruppenavn fra frontend
  const gruppe = req.body.gruppenavn
  
  db.query(
    "INSERT INTO gruppe (gruppenavn) VALUES (?)",
    gruppe,
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //res.send("Values Inserted"); // tror man kan få ID'en herfra
      }
    }
  );
}; // slutt på funksjon GruppeInput()


// SLETTER en gruppe fra DB. NB! Alle medlemmene må være slettet først
exports.slettGruppe = function(req, res)  {
  let gruppeID = req.body.gruppeID

  const sqlSelect = "DELETE FROM gruppe WHERE gruppeID = ?";
  db.query(sqlSelect, gruppeID, (err, result) => {
    if (err) {
      console.log(err)
      console.log('Gruppe id: ' + gruppeID)
    } 
    else {
      res.send(result);
      console.log('Gruppe id: ' + gruppeID)
      }
    });
};

// OPPDATERER gruppenavnet
exports.nyttGruppenavn = function(req, res)  {
  let gruppeID = req.query.gruppeID;
  let gruppenavn = req.query.gruppenavn;

  const sqlSelect = "UPDATE gruppe SET gruppenavn = '?' WHERE gruppeID = ?";
  db.query(sqlSelect, [gruppenavn, gruppeID], (err, result) => { // er det riktig med [ggg, ggg]??
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
      }
    });
};

// Henter MEDLEMMENE til en gruppe
exports.getMedlem = function(req, res)  {
  let gruppeID = req.query.gruppeID; 
  // console.log("Gruppeid: " + gruppeID); 

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

// Denne funker IKKE!!
// Funksjon som lagrer et NYTT GRUPPEMEDLEM i databasen
exports.nyttMeldem = function(req, res)  {

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
}; // slutt på funksjon nyttMedlem()


// Funksjon som SLETTER ET GRUPPEMEDLEM i databasen
exports.slettMedlem = function(req, res)  {

  // Henter gruppeID og brukerID fra frontend
  const brukerID = req.body.idbruker
  const gruppeID = req.body.gruppeID
  
  db.query(
    "DELETE FROM gruppemedlem WHERE idbruker = ? AND gruppeID = ?;",
    brukerID, gruppeID, 
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        //res.send("Values Inserted"); // tror man kan få ID'en herfra
      }
    }
  );
}; // slutt på funksjon slettMedlem()

