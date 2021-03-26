const db = require("../config/config.js");


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
