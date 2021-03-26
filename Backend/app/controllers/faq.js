const bcrypt = require ('bcrypt');

const db = require("../config/config.js");



//Registrere spørsmål og svar:
exports.createFaq = function(req, res)  {  
    const spørsmål = req.body.spørsmål;
    const svar = req.body.svar;
    //SQL-INSERT:
    const sqlInsert = "INSERT INTO faq (spørsmål, svar) VALUES (?,?)";
    db.query(sqlInsert, [spørsmål, svar], (err, result) => {
      if (err) {
        console.log(err)
      } 
      else {
        res.send(result);
      }
    });
};


//SQL-SELECT:
  exports.getAllFaq = function(req, res)  {
    const sqlSelect = "SELECT * FROM faq";
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
exports.updateFaq = function(req, res)  {
  var idfaq = req.body.idfaq;
  var spørsmål = req.body.spørsmål;
  var svar = req.body.svar;

  var newSpørsmål = req.body.newSpørsmål;
  var newSvar = req.body.newSvar;

  if(newSpørsmål==null || newSpørsmål==""){newSpørsmål=spørsmål};
  if(newSvar==null || newSvar==""){newSvar=svar};

  const sqlUpdate = "UPDATE faq SET spørsmål = ?, svar = ? WHERE idfaq = ?";
  db.query(sqlUpdate, [newSpørsmål, newSvar, idfaq], (err, result) => {
      if (err) {
        console.log(err)
      } 
      else {
        res.send(result);
        }
  });

};


//Slette spørsmål på idfaq:
exports.deleteFaq = function(req, res)  {
  var idfaq = req.body.idfaq;
  console.log("Idfaq: " + idfaq)
  //SQL-DELETE:
  const sqlDelete = "DELETE FROM faq WHERE idfaq = ?";
  db.query(sqlDelete, idfaq, (err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
    }
  }); 
};