const bcrypt = require ('bcrypt');
const jwt = require("jsonwebtoken");
const db = require("../config/config.js");
require('dotenv').config();
// Tidsbank
const tidsbankQueries = require('../controllers/tidsbank');
var epostTidsbank = "";
// -------
exports.validateLogginn = async function(req, res) {
    var epost = req.body.epost;
    var passord = req.body.passord;
    epostTidsbank = epost;
    const sqlQuery = "SELECT * FROM bruker WHERE epost = ?";
    db.query(sqlQuery, [epost], async function (err, result) {
        if(err) {
            console.log(err);
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
        }
        else {
            if(result.length > 0) {
                const comparison = await bcrypt.compare(passord, result[0].passord);
                if(comparison) {
                    req.session.user = result;
                    var token = jwt.sign({ id: req.session.user[0].idbruker }, process.env.TOKEN_SECRET, {
                        expiresIn: 1800
                    });

                    if(req.session.user) {
                        // Sender tidsbankQueries eposten for å gå videre med lagring av innloggingstidspunktet.
                        tidsbankQueries.tbStart(epostTidsbank);
                        res.send({
                            id: req.session.user[0].idbruker,
                            role: result[0].idbrukertype,
                            user: req.session.user,
                            username: result[0].fornavn,
                            accessToken: token,
                            message: "Velkommen"})
                     } else {
                        res.send({loggedin: false})
                     }
                }
                else {
                    res.send({ message: "Feil e-post/passord"
                    })
                }
            }
            else {
                res.send({ message: "E-post eksisterer ikke"
                });
            }
        }
    });
}