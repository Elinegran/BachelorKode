const db = require("../config/config.js");
const express = require("express");
const app = express();

//const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Henter ALLE gruppene fra Databasen
exports.getMineGrupper = function(req, res)  {
    const sqlSelect = `SELECT * 
                       FROM gruppe 
                       WHERE gruppenavn IS NOT NULL
                       ORDER BY gruppenavn`;
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
  let idbruker = req.query.idbruker; // Får den innloggede brukeren fra Frontend
  console.log(idbruker); 

  const sqlSelect = `SELECT gruppemedlem.gruppeID, gruppenavn
                     FROM gruppe, gruppemedlem  
                     WHERE idbruker = ?
                     AND gruppe.gruppeID = gruppemedlem.gruppeID
                     ORDER BY gruppenavn`;

  db.query(sqlSelect, idbruker, (err, result) => {
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

  // Henter gruppenavn fra frontend
  const gruppenavn = req.body.gruppenavn;

  const nyGruppe = 'INSERT INTO gruppe (gruppenavn) VALUES (?)';
  db.query(nyGruppe, gruppenavn, (err, result) => { 
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
      }
    });

}; // slutt på funksjon GruppeInput()


// SLETTER en gruppe fra DB. NB! Alle medlemmene må være slettet først
exports.slettGruppe = function(req, res)  {
  
  const gruppeID = req.body.gruppeID;  
  console.log('GruppeID er: ' + gruppeID); // Får ikke tak i gruppeID (undefined)

  const sqlSelect = "DELETE FROM gruppe WHERE gruppeID = ?"; // funket med post i Frontend og UPDATE 
  
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
  const gruppeID = req.body.gruppeID; 
  const gruppenavn = req.body.gruppenavn; 

  const sqlSelect = "UPDATE gruppe SET gruppenavn = ? WHERE gruppeID = ?";
  db.query(sqlSelect, [gruppenavn, gruppeID], (err, result) => { 
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
    
    db.query(sqlSelect, gruppeID, (err, result) => { // Feilmeld her, Protkol seq timeout...
      if (err) {
        console.log(err)
      } 
      else {
        res.send(result);
        }
      });
};

// Denne funker delvis!!
// Funksjon som lagrer et NYTT GRUPPEMEDLEM i databasen
exports.MedlemInput = function(req, res)  {

  // Henter gruppeID og brukerID fra frontend
  const idbruker = req.body.idbruker
  const gruppeID = req.body.gruppeID

  const nyttMedlem = 'INSERT INTO gruppemedlem VALUES (?,?)';
  db.query(nyttMedlem, [idbruker, gruppeID], (err, result) => { 
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
      }
    });

}; // slutt på funksjon nyttMedlem()


// Funksjon som SLETTER ET GRUPPEMEDLEM i databasen
exports.slettMedlem = function(req, res)  {

  // Henter gruppeID og brukerID fra frontend
  const brukerID = req.body.idbruker; 
  console.log('idbruker: ' + brukerID);
  const gruppeID = req.body.gruppeID;
  console.log('gruppeID ' + gruppeID);

  const slett = "DELETE FROM gruppemedlem WHERE idbruker = ? AND gruppeID = ?";
  
  db.query(slett, [brukerID, gruppeID ], (err, result) => {
    if (err) {
      console.log(err)
      console.log(id)
    } 
    else {
      res.send(result);
      }
    });
}; // slutt på funksjon slettMedlem()

