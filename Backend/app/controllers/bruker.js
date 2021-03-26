const bcrypt = require ('bcrypt');

const db = require("../config/config.js");

//Registrere bruker:
exports.createBruker = function(req, res)  {  
  const fornavn = req.body.fornavn;
  const etternavn = req.body.etternavn;
  const tlf = req.body.tlf;
  const epost = req.body.epost;
  const idbrukertype = req.body.idbrukertype;

  //Dagens dato blir lagt inn som fødselsdato:
  var currentDate = new Date();
  const fdato = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate();

  //Hashing av passord:
  const passord = req.body.passord;
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(passord, salt, function(err, hashedPassord) {
      //SQL-INSERT:
      const sqlInsert = "INSERT INTO bruker (fornavn, etternavn, fdato, tlf, epost, idbrukertype, passord, brukerstatus) VALUES (?,?,?,?,?,?,?,?)";
      db.query(sqlInsert, [fornavn, etternavn, fdato, tlf, epost, idbrukertype, hashedPassord, 1], (err, result) => {
        if (err) {
          console.log(err)
          console.log(result);
        } 
        else {
          res.send(result);
          }
      });
      console.log(err);
    });
    console.log(err);  
  });
};


//SQL-SELECT:
exports.getAll = function(req, res)  {
    const sqlSelect = "SELECT * FROM bruker";
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
exports.getOne = function(req, res)  {
  let idbruker = req.query.idbruker;

  const sqlSelect = "SELECT * FROM bruker WHERE idbruker = ?";
  db.query(sqlSelect, [idbruker], (err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
      }
    });
};


exports.getBrukertype = function(req, res)  {
  const sqlSelect = "SELECT * FROM bruker";
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
exports.updateBruker = function(req, res)  {
  var idbruker = req.body.idbruker;
  var fornavn = req.body.fornavn;
  var etternavn = req.body.etternavn;
  var tlf = req.body.tlf;
  var epost = req.body.epost;
  var gatenavn = req.body.gatenavn;
  var postnr = req.body.postnr;
  var poststed = req.body.poststed;
  var passord = req.body.passord;

  var newFornavn = req.body.newFornavn;
  var newEtternavn = req.body.newEtternavn;
  var newFdato = req.body.newFdato;
  var newTlf = req.body.newTlf;
  var newEpost = req.body.newEpost;
  var newGatenavn = req.body.newGatenavn;
  var newPostnr = req.body.newPostnr;
  var newPoststed = req.body.newPoststed;
  var newPassord = req.body.newPassord;

  if(newFornavn==null || newFornavn==""){newFornavn=fornavn};
  if(newEtternavn==null || newEtternavn==""){newEtternavn=etternavn};
  if(newTlf==null || newTlf==""){newTlf=tlf};
  if(newEpost==null || newEpost==""){newEpost=epost};
  if(newGatenavn==null){newGatenavn=gatenavn};
  if(newPostnr==null){newPostnr=postnr};
  if(newPoststed==null){newPoststed=poststed};
  if(newPassord==null || newPassord==""){newPassord=passord};
    
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(newPassord, salt, function(err, hashedPassord) {
    const sqlUpdate = "UPDATE bruker SET fornavn = ?, etternavn = ?, fdato= ?, tlf = ?, epost = ?, gatenavn = ?, postnr = ?, poststed = ?, passord = ? WHERE idbruker = ?";
    db.query(sqlUpdate, [newFornavn, newEtternavn, newFdato, newTlf, newEpost, newGatenavn, newPostnr, newPoststed, hashedPassord, idbruker], (err, result) => {
        if (err) {
          console.log(err)
        } 
        else {
          res.send(result);
          }
      });
      console.log(err);
    });
    console.log(err);  
  });
};


//SQL-SELECT:
exports.getOneWithMore = function(req, res)  {
  let param = req.query.idbruker;
  const sqlSelect = "SELECT * FROM bruker WHERE idbruker = ?";
  db.query(sqlSelect, [param], (err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
      }
    });
};


exports.setStatus = function(req, res)  {
  const idbruker = req.body.idbruker;
  const status = req.body.status;
  console.log("idbruker: " + idbruker + "Status: " + status)
  const sqlSelect = "UPDATE bruker SET brukerstatus = ? WHERE idbruker = ?";
  db.query(sqlSelect, [status, idbruker], (err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
      }
    });
};