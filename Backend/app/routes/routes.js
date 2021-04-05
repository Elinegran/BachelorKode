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

//Kalender: 
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
const minSamtale = require('../controllers/meldinger');
router.use("/meldingerMinSamtale", minSamtale.getMinSamtale); 

// Grupper: 
// Henter ALLE gruppene (Funker!)
const mineGrupper= require('../controllers/grupper');
router.use("/meldingerMineGrupper", mineGrupper.getMineGrupper); 

// Henter gruppene til en bruker (Ikke lagd enda, venter til vi deler bruker og veileder)
const brukerGrupper= require('../controllers/grupper');
// router.use("/brukerGrupper", brukerGrupper.hentMineGrupper); 

// Legger til en ny gruppe (Funker!)
const addGruppe = require('../controllers/grupper'); 
router.use("/grupperNyeGrupper", addGruppe.GruppeInput );

// Endrer gruppenavnet (Funker!)
const gruppenavn = require('../controllers/grupper'); 
router.use("/gruppenavn", gruppenavn.nyttGruppenavn );

// Sletter en gruppe (Funker IKKE, Backend mottar ikke gruppeID)
const deleteGruppe = require('../controllers/grupper'); 
router.use("/deleteGruppe", deleteGruppe.slettGruppe );

// Legger et nytt meldlem til en gruppe (Funker delvis, idbruker er input, ikke select)
const addMedlem = require('../controllers/grupper'); 
router.use("/addMedlem", addMedlem.MedlemInput)

// Sletter et medlem fra en gruppe (Ikke lagd enda)
const deleteMedlem = require('../controllers/grupper'); 
router.use("/deleteMedlem", deleteMedlem.slettMedlem)

// Henter MEDLEMMENE i en gruppe (Funker!!)
const getGruppemedlem = require('../controllers/grupper');
router.use("/gruppeGetMedlemmer", getGruppemedlem.getMedlem)






// Eksporterer denne modellen, så server.js får brukt den
module.exports = router;