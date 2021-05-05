//Utviklet av: Gruppe 2
const bcrypt = require ('bcrypt');

const db = require("../config/config.js");

//Legge til en ny aktivitet:
exports.createAktivitet = function(req, res)  {  
    const tittel = req.body.tittel;
    const dato = req.body.dato;
    const tidspunkt = req.body.tidspunkt;
    const sted = req.body.sted;
    const tekst = req.body.tekst;
    //SQL-INSERT:
    const sqlInsert = "INSERT INTO aktivitet (tittel, dato, tidspunkt, sted, tekst) VALUES (?,?,?,?,?)";
    db.query(sqlInsert, [tittel, dato, tidspunkt, sted, tekst], (err, result) => {
      if (err) {
        console.log(err)
      } 
      else {
        res.send(result);
      }
    });
};


//Henter en spesifikk aktivitet:
exports.getOneAktivitet = function(req, res)  {
  idaktivitet = req.body.idaktivitet;
  const sqlSelect = "SELECT *, TIME_FORMAT(tidspunkt, '%H:%i') as tidspunktformat FROM aktivitet where idaktivitet=?";
  db.query(sqlSelect, [idaktivitet], (err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
      }
    });
};
//SQL-SELECT:
exports.getAllAktivitet = function(req, res)  {
    const sqlSelect = "SELECT *, TIME_FORMAT(tidspunkt, '%H:%i') as tidspunktformat FROM aktivitet";
    db.query(sqlSelect, (err, result) => {
      if (err) {
        console.log(err)
      } 
      else {
        res.send(result);
        }
      });
};

//SQL-SELECT:
exports.getAktivitetMax3 = function(req, res)  {
  const sqlSelect = "SELECT *, TIME_FORMAT(tidspunkt, '%H:%i') as tidspunktformat FROM aktivitet ORDER BY idaktivitet DESC LIMIT 3";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
      }
    });
};

//SQL-UPDATE:
exports.updateAktivitet = function(req, res)  {
    var idaktivitet = req.body.idaktivitet;
    var tittel = req.body.tittel;
    var dato = req.body.dato;
    var tidspunkt = req.body.tidspunkt;
    var sted = req.body.sted;
    var tekst = req.body.tekst;

    var newTittel = req.body.newTittel;
    var newDato = req.body.newDato;
    var newTidspunkt = req.body.newTidspunkt;
    var newSted = req.body.newSted;
    var newTekst = req.body.newTekst;

    if(newTittel==null || newTittel==""){newTittel=tittel};
    if(newDato==null || newDato==""){newDato=dato};
    if(newTidspunkt==null || newTidspunkt==""){newTidspunkt=tidspunkt};
    if(newSted==null || newSted==""){newSted=sted};
    if(newTekst==null){newTekst=tekst};
    
    const sqlUpdate = "UPDATE aktivitet SET tittel = ?, dato = ?, tidspunkt = ?, sted = ?, tekst = ? WHERE idaktivitet = ?";
    db.query(sqlUpdate, [newTittel, newDato, newTidspunkt, newSted, newTekst, idaktivitet], (err, result) => {
        if (err) {
          console.log(err)
        } 
        else {
          res.send(result);
          }
    });

};


//Slette spørsmål på idfaq:
exports.deleteAktivitet = function(req, res)  {
    var idaktivitet = req.body.idaktivitet;
    console.log("Idaktivitet: " + idaktivitet)
    //SQL-DELETE:
    const sqlDelete = "DELETE FROM aktivitet WHERE idaktivitet = ?";
    db.query(sqlDelete, idaktivitet, (err, result) => {
      if (err) {
        console.log(err)
      } 
      else {
        res.send(result);
      }
    }); 
};