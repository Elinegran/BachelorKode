const db = require("../config/config.js");
var idbruker = "";

exports.getMonthly = function(req, res) {
    let idbruker = req.query.idbruker;
    const sqlSelect = "SELECT idbruker\
                      ,SEC_TO_TIME(SUM(TIME_TO_SEC(loggetut) - TIME_TO_SEC(loggetinn))) AS tid\
                      FROM tidsbank\
                      WHERE idbruker=?\
                      AND loggetinn IS NOT NULL\
                      AND loggetut IS NOT NULL\
                      AND MONTH(loggetinn) = month(CURRENT_TIMESTAMP)\
                      group by idbruker\
                      ;"
    db.query(sqlSelect, [idbruker],(err, result) => {
      if (err) {
        console.log(err)
      } 
      else {
        res.send(result);

        }
      });
}
exports.getMonthlyMinutes = function(req, res) {
  let idbruker = req.query.idbruker;
  const sqlSelect = "SELECT idbruker, \
                          (SELECT SUM(TIME_TO_SEC(loggetut) - TIME_TO_SEC(loggetinn))\
                          FROM tidsbank\
                          WHERE idbruker=?\
                          AND MONTH(loggetinn) = '1') as Januar,\
                          (SELECT(SUM(TIME_TO_SEC(loggetut) - TIME_TO_SEC(loggetinn)))\
                          FROM tidsbank\
                          WHERE idbruker=?\
                          AND MONTH(loggetinn) = '2') as Februar,\
                          (SELECT(SUM(TIME_TO_SEC(loggetut) - TIME_TO_SEC(loggetinn)))\
                          FROM tidsbank\
                          WHERE idbruker=?\
                          AND MONTH(loggetinn) = '3') as Mars,\
                          (SELECT(SUM(TIME_TO_SEC(loggetut) - TIME_TO_SEC(loggetinn)))\
                          FROM tidsbank\
                          WHERE idbruker=?\
                          AND MONTH(loggetinn) = '4') as April,\
                          (SELECT(SUM(TIME_TO_SEC(loggetut) - TIME_TO_SEC(loggetinn)))\
                          FROM tidsbank\
                          WHERE idbruker=?\
                          AND MONTH(loggetinn) = '5') as Mai,\
                          (SELECT(SUM(TIME_TO_SEC(loggetut) - TIME_TO_SEC(loggetinn)))\
                          FROM tidsbank\
                          WHERE idbruker=?\
                          AND MONTH(loggetinn) = '6') as Juni,\
                          (SELECT(SUM(TIME_TO_SEC(loggetut) - TIME_TO_SEC(loggetinn)))\
                          FROM tidsbank\
                          WHERE idbruker=?\
                          AND MONTH(loggetinn) = '7') as Juli,\
                          (SELECT(SUM(TIME_TO_SEC(loggetut) - TIME_TO_SEC(loggetinn)))\
                          FROM tidsbank\
                          WHERE idbruker=?\
                          AND MONTH(loggetinn) = '8') as August,\
                          (SELECT(SUM(TIME_TO_SEC(loggetut) - TIME_TO_SEC(loggetinn)))\
                          FROM tidsbank\
                          WHERE idbruker=?\
                          AND MONTH(loggetinn) = '9') as September,\
                          (SELECT(SUM(TIME_TO_SEC(loggetut) - TIME_TO_SEC(loggetinn)))\
                          FROM tidsbank\
                          WHERE idbruker=?\
                          AND MONTH(loggetinn) = '10') as Oktober,\
                          (SELECT(SUM(TIME_TO_SEC(loggetut) - TIME_TO_SEC(loggetinn)))\
                          FROM tidsbank\
                          WHERE idbruker=?\
                          AND MONTH(loggetinn) = '11') as November,\
                          (SELECT(SUM(TIME_TO_SEC(loggetut) - TIME_TO_SEC(loggetinn)))\
                          FROM tidsbank\
                          WHERE idbruker=?\
                          AND MONTH(loggetinn) = '12') as Desember\
                   FROM tidsbank\
                    WHERE idbruker=?\
                    AND loggetinn IS NOT NULL\
                    AND loggetut IS NOT NULL\
                    AND MONTH(loggetinn) = month(CURRENT_TIMESTAMP)\
                    group by idbruker;"
      
  db.query(sqlSelect, [idbruker, idbruker, idbruker, idbruker, idbruker,idbruker,idbruker,idbruker,idbruker, idbruker, idbruker,idbruker,idbruker],(err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);

      }
    });
}

exports.getMonthlyAverage = function(req, res)  {
  const sqlSelect = 
  "SELECT distinct\
      (SELECT AVG(tidsbanksum) as jan\
        FROM\
        (\
          SELECT idbruker, SUM((TIME_TO_SEC(loggetut)) - (TIME_TO_SEC(loggetinn))) AS tidsbanksum\
          FROM tidsbank\
          WHERE month(loggetinn) = 1\
          GROUP BY idbruker\
        ) as inner_query) as AvgJan, \
      (SELECT AVG(tidsbanksum) as feb\
      FROM\
      (\
          SELECT idbruker, SUM((TIME_TO_SEC(loggetut)) - (TIME_TO_SEC(loggetinn))) AS tidsbanksum\
          FROM tidsbank\
          WHERE month(loggetinn) = 2\
          GROUP BY idbruker\
      ) as inner_query) as AvgFeb,\
      (SELECT AVG(tidsbanksum) as mar\
      FROM\
      (\
          SELECT idbruker, SUM((TIME_TO_SEC(loggetut)) - (TIME_TO_SEC(loggetinn))) AS tidsbanksum\
          FROM tidsbank\
          WHERE month(loggetinn) = 3\
          GROUP BY idbruker\
      ) as inner_query) as AvgMar\,\
      (SELECT AVG(tidsbanksum) as apr\
      FROM\
      (\
          SELECT idbruker, SUM((TIME_TO_SEC(loggetut)) - (TIME_TO_SEC(loggetinn))) AS tidsbanksum\
          FROM tidsbank\
          WHERE month(loggetinn) = 4\
          GROUP BY idbruker\
      ) as inner_query) as AvgApr,\
      (SELECT AVG(tidsbanksum) as may\
      FROM\
      (\
          SELECT idbruker, SUM((TIME_TO_SEC(loggetut)) - (TIME_TO_SEC(loggetinn))) AS tidsbanksum\
          FROM tidsbank\
          WHERE month(loggetinn) = 5\
          GROUP BY idbruker\
      ) as inner_query) as AvgMay,\
      (SELECT AVG(tidsbanksum) as jun\
      FROM\
      (\
          SELECT idbruker, SUM((TIME_TO_SEC(loggetut)) - (TIME_TO_SEC(loggetinn))) AS tidsbanksum\
          FROM tidsbank\
          WHERE month(loggetinn) = 6\
          GROUP BY idbruker\
      ) as inner_query) as AvgJun,\
      (SELECT AVG(tidsbanksum) as jul\
      FROM\
      (\
          SELECT idbruker, SUM((TIME_TO_SEC(loggetut)) - (TIME_TO_SEC(loggetinn))) AS tidsbanksum\
          FROM tidsbank\
          WHERE month(loggetinn) = 7\
          GROUP BY idbruker\
      ) as inner_query) as AvgJul,\
      (SELECT AVG(tidsbanksum) as aug\
      FROM\
      (\
          SELECT idbruker, SUM((TIME_TO_SEC(loggetut)) - (TIME_TO_SEC(loggetinn))) AS tidsbanksum\
          FROM tidsbank\
          WHERE month(loggetinn) = 8\
          GROUP BY idbruker\
      ) as inner_query) as AvgAug,\
      (SELECT AVG(tidsbanksum) as sep\
      FROM\
      (\
          SELECT idbruker, SUM((TIME_TO_SEC(loggetut)) - (TIME_TO_SEC(loggetinn))) AS tidsbanksum\
          FROM tidsbank\
          WHERE month(loggetinn) = 9\
          GROUP BY idbruker\
      ) as inner_query) as AvgSep,\
      (SELECT AVG(tidsbanksum) as oct\
      FROM\
      (\
          SELECT idbruker, SUM((TIME_TO_SEC(loggetut)) - (TIME_TO_SEC(loggetinn))) AS tidsbanksum\
          FROM tidsbank\
          WHERE month(loggetinn) = 10\
          GROUP BY idbruker\
      ) as inner_query) as AvgOct,\
      (SELECT AVG(tidsbanksum) as nov\
      FROM\
      (\
          SELECT idbruker, SUM((TIME_TO_SEC(loggetut)) - (TIME_TO_SEC(loggetinn))) AS tidsbanksum\
          FROM tidsbank\
          WHERE month(loggetinn) = 11\
          GROUP BY idbruker\
      ) as inner_query) as AvgNov,\
      (SELECT AVG(tidsbanksum) as des\
      FROM\
      (\
          SELECT idbruker, SUM((TIME_TO_SEC(loggetut)) - (TIME_TO_SEC(loggetinn))) AS tidsbanksum\
          FROM tidsbank\
          WHERE month(loggetinn) = 12\
          GROUP BY idbruker\
      ) as inner_query) as AvgDec FROM tidsbank;"
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.send(result);
      }
    });
};

exports.getAll = function(req, res) {
    let idbruker = req.query.idbruker;
    const sqlSelect = "SELECT idbruker\
                      ,SEC_TO_TIME(SUM(TIME_TO_SEC(loggetut) - TIME_TO_SEC(loggetinn))) AS totaltid\
                      FROM tidsbank\
                      WHERE idbruker=?\
                      AND loggetinn IS NOT NULL\
                      AND loggetut IS NOT NULL\
                      group by idbruker\
                      ;"
                        
    db.query(sqlSelect, [idbruker],(err, result) => {
      if (err) {
        console.log(err)
      } 
      else {
        res.send(result);
        }
      });
}
exports.tbStart = function(epostTidsbank, req, res)  {  
    const epost = epostTidsbank;
    var idtidsbank = null;
    console.log("Epost fra logginn:" + epost);
    const sqlQuery = "SELECT idbruker FROM bruker WHERE epost=?"
    db.query(sqlQuery,[epost] , (err, result)=> {
        if (err) {
          console.log(err)
        } 
        else {
            idbruker = result[0].idbruker;
          console.log("idbruker fra spørring: " + idbruker)
          const sqlQueryLogoutNull = "SELECT idtidsbank, loggetinn FROM tidsbank WHERE idbruker = ? AND loggetut IS NULL"
          db.query(sqlQueryLogoutNull, [idbruker], (err, result) => {
              if (err) {
                  console.log(err)
                  console.log(result)
              }
              else {
                  if (result.length > 0) {
                  idtidsbank = result[0].idtidsbank;
                  console.log("Sjekk om null:" + idtidsbank)
                  }
                  // Hvis det ikke er registrert loggut-tidspunkt, skal det ikke registreres nytt tidspunkt for logginn.
                  if (idtidsbank != null) {
                    console.log("Brukeren har allerede registrert tidsbank logginn datetime: " + result[0].loggetinn);
                }
                else {
                    // Hvis det ikke finnes poster med samme idbruker og null på loggut, registreres nytt logginntidspunkt.
                    const sqlInsert = " INSERT INTO tidsbank (idbruker, loggetinn) VALUES (?, NOW())"
                    db.query(sqlInsert, [idbruker], (err, result)=> {
                        if (err) {
                          console.log(err)
                          console.log(result);
                        } 
                        else {
                          // console.log("Tidsbank-lagring vellykket!" );
                          }
                      });
                      console.log(err);
                    }
              }
          });
       
        }
    });
}
   
exports.tbSlutt = function(req, res)  {  
    var idbruker = req.body.idbruker;
    var idtidsbank = null;

          const sqlQueryLogoutNull = "SELECT idtidsbank, loggetinn FROM tidsbank WHERE idbruker = ? AND loggetut IS NULL"
          db.query(sqlQueryLogoutNull, [idbruker], (err, result) => {
              if (err) {
                  console.log(err)
                  console.log(result)
              }
              else {
                  if (result.length > 0) {
                  idtidsbank = result[0].idtidsbank;
                  console.log("Sjekk om null:" + idtidsbank)
                  }
                  // Hvis det ikke er registrert loggut-tidspunkt, skal det registreres nytt tidspunkt for loggut.
                  if (idtidsbank != null) {
                    console.log("Brukeren har allerede registrert tidsbank logginn datetime: " + result[0].loggetinn);
                    const sqlInsert = " UPDATE tidsbank SET loggetut=NOW() WHERE idtidsbank= ?"
                    db.query(sqlInsert, [idtidsbank], (err, result)=> {
                        if (err) {
                          console.log(err)
                          console.log(result);
                        } 
                        else {
                          console.log("Tidsbank-lagring for loggut vellykket!" );
                          }
                      });
                      console.log(err);
                }
                else {
                    // Hvis det ikke finnes poster med samme idbruker og null på loggut, kan det ikke registreres loggut tidspunkt.
                    console.log("Tidsbank-lagring for loggut feilet! Fant ingen null-verdier i loggetut for brukeren:" + idbruker );
                    }
              }
          });
       
        }
 