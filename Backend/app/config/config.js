const mysql = require("mysql");


const db = mysql.createPool({
    host: "mbdigital.mysql.database.azure.com",
    user: "mbadmin@mbdigital",
    password: "",
    database: "matchbox_digital",
    ssl:true
  });

// var conn = mysql.createConnection({host: "mbdigital.mysql.database.azure.com", user: "mbadmin@mbdigital", password: {your_password}, database: {your_database}, port: 3306, ssl:{ca:fs.readFileSync({ca-cert filename})}});


db.getConnection(function(err) {
    if (err) throw err;
});

module.exports = db;
