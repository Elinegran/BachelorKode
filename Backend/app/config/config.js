const mysql = require("mysql");

 const db = mysql.createPool({
   host: "*****",
   user: "****",
   password: "*****",
   database: "*****",
 });

db.getConnection(function(err) {
    if (err) throw err;
});

module.exports = db;

