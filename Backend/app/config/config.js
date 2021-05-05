//Utviklet av: Gruppe 2
const mysql = require("mysql");

// const db = mysql.createPool({
//   host: "localhost",
//   user: "gruppe2",
//   password: "gruppe2",
//   database: "matchbox_digital",
// });

var db = mysql.createPool({
  host: "mbdigital.mysql.database.azure.com", 
  user: "mbadmin@mbdigital", 
  password: "!Datab4se12#", 
  database: "matchbox_digital", 
  port: 3306, 
  ssl:true, 
  connectionLimit: 3});

// const db = mysql.createPool({
//   host: "mbdigitalno01.mysql.domeneshop.no",
//   user: "mbdigitalno01", 
//   password: "9-Stank-tulla-Hogge-hang",
//   database: "mbdigitalno01",
//   connectionLimit: 3
// });

db.getConnection(function(err) {
    if (err) throw err;
});

module.exports = db;
