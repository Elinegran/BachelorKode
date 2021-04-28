const mysql = require("mysql");

// const db = mysql.createPool({
//   host: "mbdigitalno01.mysql.domeneshop.no",
//   user: "mbdigitalno01",
//   password: "9-Stank-tulla-Hogge-hang",
//   database: "mbdigitalno01",
// });

// const db = mysql.createPool({
//   host: "",
//   user: "",
//   password: "",
//   database: "",
// });

const db = mysql.createPool({
    host: "mbdigital.mysql.database.azure.com",
    user: "mbadmin@mbdigital",
    password: "!Datab4se12#",
    database: "matchbox_digital",
    ssl:true
  });

// var conn = mysql.createConnection({host: "mbdigital.mysql.database.azure.com", user: "mbadmin@mbdigital", password: {your_password}, database: {your_database}, port: 3306, ssl:{ca:fs.readFileSync({ca-cert filename})}});


db.getConnection(function(err) {
    if (err) throw err;
});

module.exports = db;
