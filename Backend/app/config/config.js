const mysql = require("mysql");

const db = mysql.createPool({
  host: "mbdigitalno01.mysql.domeneshop.no",
  user: "mbdigitalno01",
  password: "9-Stank-tulla-Hogge-hang",
  database: "mbdigitalno01",
});

// const db = mysql.createPool({
//   host: "",
//   user: "",
//   password: "",
//   database: "",
// });

db.getConnection(function(err) {
    if (err) throw err;
});

module.exports = db;
