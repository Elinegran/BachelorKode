//Utviklet av: Gruppe 2
const db = require("../config/config.js");

//Registrere keywords, svar og link:
exports.createChatbot = function(req, res)  {  
  const keywords = req.body.keywords;
  const svar = req.body.svar;
  const linkTekst = req.body.linkTekst;
  const link = req.body.link;
  //SQL-INSERT:
  const sqlInsert = "INSERT INTO chatbot_spm_svar (spm, svar, linkTekst, link) VALUES (?,?,?,?)";
  db.query(sqlInsert, [keywords, svar, linkTekst, link], (err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
    }
  });
};

exports.getAll = function(req, res)  {
  const sqlSelect = "SELECT * FROM chatbot_spm_svar";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
      }
    });
};
//Sjekk nøkkelord mot spm, og få svar:
exports.checkAndGet = function(req, res)  {
    let keyword = "%" + req.body.keyword + "%";
    console.log("Kw fra backend:" + keyword);
    const sqlSelect = "SELECT svar, link\
                     from chatbot_spm_svar\
                    where spm like ?;"
    db.query(sqlSelect, [keyword],(err, result) =>{
      if (err) {
        console.log(err)
      } 
      else {
          console.log(result)
        res.send(result);
        }
      });
};

exports.getOne = function(req, res)  {
  let id = req.body.id;
  console.log("id fra backend:" + id);
  const sqlSelect = "SELECT *\
                   from chatbot_spm_svar\
                  where idchatbot_spm_svar = ?;"
  db.query(sqlSelect, [id],(err, result) =>{
    if (err) {
      console.log(err)
    } 
    else {
        console.log(result)
      res.send(result);
      }
    });
};

//Oppdatere spm i chatbot
exports.updateChatbot = function(req, res)  {
  var idchatbotSpm = req.body.idChatbotSpm;
  var newKeywords = req.body.newKeywords;
  var newSvar = req.body.newSvar;
  var newLinkTekst = req.body.newLinkTekst;
  var newLink = req.body.newLink;
  console.log("Backend; " + idchatbotSpm, newKeywords, newSvar, newLinkTekst, newLink)
  const sqlUpdate = "UPDATE chatbot_spm_svar SET spm = ?, svar = ? , linkTekst=?, link = ? WHERE idchatbot_spm_svar = ?";
  db.query(sqlUpdate, [newKeywords, newSvar, newLinkTekst, newLink, idchatbotSpm], (err, result) => {
      if (err) {
        console.log(err)
      } 
      else {
        res.send(result);
        }
  });

};

//Slette spørsmål fra chatbot
exports.deleteChatbot = function(req, res)  {
  var idChatbotSpm = req.body.idChatbotSpm;
  console.log("Backend ID: " + idChatbotSpm)
  //SQL-DELETE:
  const sqlDelete = "DELETE FROM chatbot_spm_svar WHERE idchatbot_spm_svar = ?";
  db.query(sqlDelete, idChatbotSpm, (err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
    }
  }); 
};


//Lagre ubesvarte spm i loggen
exports.saveUAQL = function(req, res)  {
  console.log("tester lagring av logg")
  var question = req.body.question;
  
  const sqlDelete = "INSERT INTO chatbot_spm_logg (spm) VALUES (?)";
  db.query(sqlDelete, question, (err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
    }
  }); 
};
exports.getUAQL = function(req, res)  {
  const sqlSelect = "SELECT * FROM chatbot_spm_logg";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
      }
    });
};