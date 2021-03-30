const express = require('express');

const router = express.Router();

// importerer Query-filer som inneholder forskjellige sql-queries osv.
const logginnQueries = require('../controllers/logginn');
const brukerQueries = require('../controllers/bruker');
const faqQueries = require('..//controllers/faq');
const aktivitetQueries = require('..//controllers/aktivitet');
const tidsbankQueries = require('../controllers/tidsbank');
const chatbotQueries = require('..//controllers/chatbot');

// Videresender routes fra server.js til Query-filene
router.use("/logginnValidate", logginnQueries.validateLogginn);
//Bruker
router.use("/brukerCreate", brukerQueries.createBruker);
router.use("/brukerGetAll", brukerQueries.getAll);
router.use("/brukerGetOne", brukerQueries.getOne);
router.use("/brukerGetBrukertype", brukerQueries.getBrukertype);
router.use("/brukerUpdate", brukerQueries.updateBruker);
router.use("/brukerGetOneWithMore", brukerQueries.getOneWithMore);
// FAQ
router.use("/faqCreate", faqQueries.createFaq);
router.use("/faqGetAll", faqQueries.getAllFaq);
router.use("/faqUpdate", faqQueries.updateFaq);
router.use("/faqDelete", faqQueries.deleteFaq);
// Aktivitet
router.use("/aktivitetCreate", aktivitetQueries.createAktivitet);
router.use("/aktivitetGetAll", aktivitetQueries.getAllAktivitet);
router.use("/aktivitetUpdate", aktivitetQueries.updateAktivitet);
router.use("/aktivitetDelete", aktivitetQueries.deleteAktivitet);
router.use("/getAktivitetMax3", aktivitetQueries.getAktivitetMax3);
router.use("/brukerSetStatus", brukerQueries.setStatus);
// Tidsbank 
router.use("/tidsbankGetMonthly", tidsbankQueries.getMonthly);
router.use("/tidsbankGetAll", tidsbankQueries.getAll);
router.use("/tidsbankSlutt", tidsbankQueries.tbSlutt);
router.use("/tidsbankMonthlyMinutes", tidsbankQueries.getMonthlyMinutes);
router.use("/tidsbankMonthlyAverage", tidsbankQueries.getMonthlyAverage);
// Chatbot 
router.use("/chatbotGetAll", chatbotQueries.getAll);
router.use("/chatbotCheckAll", chatbotQueries.checkAndGet);

//Kalender
const kalender = require('../controllers/kalender');
router.use("/kalenderAlleAvtaler", kalender.getKalenderAlle);

router.use("/nyAvtale", kalender.NyAvtale);

router.use("/updateTid", kalender.UpdateTid);
router.use("/slettAvtale", kalender.deleteAvtale)

//Meldinger:

// Alle meldingene som en bruker har fått
const mineMeldinger = require('../controllers/meldinger');
router.use("/meldingerMineMeldinger", mineMeldinger.getMineMeldinger);

 // Innboks skrive meldinger
 const innboksMeldinger = require('../controllers/meldinger');
 router.use("/meldingerInnboksMeldinger", innboksMeldinger.InsertInnboksMeldinger);

 // Samtalen mellom 2 brukere
const minSamtale = require('../controllers/samtale');
router.use("/meldingerMinSamtale", minSamtale.getMinSamtale); 

// Henter alle grupper
const mineGrupper= require('../controllers/grupper');
router.use("/meldingerMineGrupper", mineGrupper.getMineGrupper); 

// Henter gruppene til en bruker
const allemineGrupper= require('../controllers/grupper');
router.use("/grupperAlleMineGrupper", allemineGrupper.hentMineGrupper); 

const addGruppe = require('../controllers/nyeGrupper'); 
router.use("/grupperNyeGrupper", addGruppe.GruppeInput );

// Legger et nytt meldlem til en gruppe
const addGruppemedlem = require('../controllers/nyttMedlem'); 
router.use("/grupperNyeGruppemedlemmer", addGruppemedlem.MedlemInput)

// Sletter et medlem fraa en gruppe
const slettGruppemedlem = require('../controllers/nyttMedlem'); 
router.use("/grupperSlettMedlem", slettGruppemedlem.MedlemDelete)

// Henter medlemmene i en gruppe
const getGruppemedlem = require('../controllers/gruppemedlemmer');
router.use("/gruppeGetMedlemmer", getGruppemedlem.getMedlem)


// Eksporterer denne modellen, så server.js får brukt den
module.exports = router;