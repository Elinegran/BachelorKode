//Utviklet av: Gruppe 2
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
      const sqlInsert = "INSERT INTO bruker (fornavn, etternavn, fdato, tlf, epost, idbrukertype, passord, brukerstatus, oppdatertpassord) VALUES (?,?,?,?,?,?,?,?)";
      db.query(sqlInsert, [fornavn, etternavn, fdato, tlf, epost, idbrukertype, hashedPassord, 1, 0], (err, result) => {
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

exports.getAll = function(req, res)  {
  const sqlSelect = "SELECT b.idbruker, fornavn, etternavn, fdato, tlf, epost, gatenavn, postnr, poststed, idbrukertype, brukerstatus, loggetut FROM bruker b, tidsbank t WHERE b.idbruker = t.idbruker GROUP BY b.idbruker";
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

//SQL-UPDATE Passord:
exports.updatePassord = function(req, res) {
  var idbruker = req.body.idbruker;
  var newPassord = req.body.newPassord;
  var confirmPassord = req.body.confirmPassord;
  var tinyint = 1;

  //Passordkrav:
  //(?=.*[A-Z]) minst 1 stor bokstav
  //(?=.*[0-9]) minst et tall
  //(?=.{8,}) minimum 8 tegn
  var passordRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
  if(confirmPassord===newPassord) {
    newPassord=confirmPassord;
      if(passordRegex.test(newPassord)) {
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function(err, salt) {
          bcrypt.hash(newPassord, salt, function(err, hashedPassord) {
            const sqlUpdate = "UPDATE bruker SET passord = ?, oppdatertpassord = ? WHERE idbruker = ?";
            db.query(sqlUpdate, [hashedPassord, tinyint, idbruker], (err, result) => {
              if(result) {
                res.send({updated: "OK", message: "Passord oppdatert!"});
              }
              else {
                console.log(err); 
              }
            })
          })
        })
      }
      else {
        res.send({message: "Passordet samsvarer ikke med kravene!"});
      }
  } 
  else {
    res.send({message: "Passord samsvarer ikke med hverandre!"});
  }
};

exports.getOppdatertPassord = function(req, res) {
  let param = req.body.idbruker;
  const sql = "SELECT oppdatertpassord FROM bruker WHERE idbruker = ?";
  db.query(sql, [param], (err, result) => {
    if(result) {
      res.send({result});
      console.log(result);
    }
    else {
      console.log(err); 
    }
  })
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
  var kjonn = req.body.kjonn;

  var newKjonn = req.body.newKjonn;
  var newFornavn = req.body.newFornavn;
  var newEtternavn = req.body.newEtternavn;
  var newFdato = req.body.newFdato;
  var newTlf = req.body.newTlf;
  var newEpost = req.body.newEpost;
  var newGatenavn = req.body.newGatenavn;
  var newPostnr = req.body.newPostnr;
  var newPoststed = req.body.newPoststed;

  if(newFornavn==null || newFornavn==""){newFornavn=fornavn};
  if(newEtternavn==null || newEtternavn==""){newEtternavn=etternavn};
  if(newTlf==null || newTlf==""){newTlf=tlf};
  if(newEpost==null || newEpost==""){newEpost=epost};
  if(newGatenavn==null){newGatenavn=gatenavn};
  if(newPostnr==null){newPostnr=postnr};
  if(newPoststed==null){newPoststed=poststed};
 
  const sqlUpdate = "UPDATE bruker SET fornavn = ?, etternavn = ?, fdato= ?, tlf = ?, epost = ?, gatenavn = ?, postnr = ?, poststed = ?, kjonn = ? WHERE idbruker = ?";
  db.query(sqlUpdate, [newFornavn, newEtternavn, newFdato, newTlf, newEpost, newGatenavn, newPostnr, newPoststed, newKjonn, idbruker], (err, result) => {
      if(err) {
        console.log(err);
      } 
      else {
        res.send(result);
      }
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

//SQL-SELECT:
exports.getCountUsers = function(req, res)  {
  const sqlSelect = "SELECT COUNT(*) as antall from bruker where brukerstatus=1";
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
exports.getOnlineUsers = function(req, res)  {
  const sqlSelect = "SELECT COUNT(*) as antall from tidsbank where loggetut is null";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
      }
    });
};
