const express = require('express');

const router = express.Router();

// importerer Query-filer som inneholder forskjellige sql-queries osv.
const logginnQueries = require('../controllers/logginn');
const brukerQueries = require('../controllers/bruker');
const faqQueries = require('../controllers/faq');
const aktivitetQueries = require('../controllers/aktivitet');
const tidsbankQueries = require('../controllers/tidsbank');
const chatbotQueries = require('../controllers/chatbot');

// Videresender routes fra server.js til Query-filene
router.use("/logginnValidate", logginnQueries.validateLogginn);
//Bruker
router.use("/brukerCreate", brukerQueries.createBruker);
router.use("/brukerGetAll", brukerQueries.getAll);
router.use("/brukerGetOne", brukerQueries.getOne);
router.use("/brukerGetBrukertype", brukerQueries.getBrukertype);
router.use("/brukerUpdate", brukerQueries.updateBruker);
router.use("/passordUpdate", brukerQueries.updatePassord);
router.use("/brukerGetOneWithMore", brukerQueries.getOneWithMore);
router.use("/brukerGetCountUsers", brukerQueries.getCountUsers);
router.use("/brukerGetOnlineUsers", brukerQueries.getOnlineUsers);
// FAQ
router.use("/faqCreate", faqQueries.createFaq);
router.use("/faqGetOne", faqQueries.getOneFaq);
router.use("/faqGetAll", faqQueries.getAllFaq);
router.use("/faqUpdate", faqQueries.updateFaq);
router.use("/faqDelete", faqQueries.deleteFaq);
// Aktivitet
router.use("/aktivitetCreate", aktivitetQueries.createAktivitet);
router.use("/aktivitetGetOne", aktivitetQueries.getOneAktivitet);
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
router.use("/chatbotGetOne", chatbotQueries.getOne);
router.use("/chatbotCreate", chatbotQueries.createChatbot);
router.use("/chatbotUpdate", chatbotQueries.updateChatbot);
router.use("/chatbotDelete", chatbotQueries.deleteChatbot);
router.use("/chatbotLogSave", chatbotQueries.saveUAQL);
router.use("/chatbotGetLog", chatbotQueries.getUAQL);

//Kalender: 
const kalender = require('../controllers/kalender');
router.use("/kalenderAlleAvtaler", kalender.getKalenderAlle);
router.use("/nyAvtale", kalender.NyAvtale);
router.use("/updateTid", kalender.UpdateTid);
router.use("/updateAvtale", kalender.updateAvtale);
router.use("/slettAvtale", kalender.deleteAvtale);
router.use("/kalenderBruker", kalender.getKalenderBruker);
router.use("/nyGruppeAvtale", kalender.NyGruppeAvtale);

//Meldinger: 
// Alle meldingene som en bruker har fått (Funker!)
const mineMeldinger = require('../controllers/meldinger');
router.use("/meldingerMineMeldinger", mineMeldinger.getMineMeldinger);

 // Innboks skrive meldinger (Funker, delvis bare hvis du har mottaker)
 const innboksMeldinger = require('../controllers/meldinger');
 router.use("/meldingerInnboksMeldinger", innboksMeldinger.InsertInnboksMeldinger);

 // Samtalen mellom 2 brukere (Funker!)
const minSamtale = require('../controllers/meldinger');
router.use("/meldingerMinSamtale", minSamtale.getMinSamtale); 

// Sende melding til ALLE brukerne
const meldingTilAlle = require('../controllers/meldinger');
router.use("/meldingTilAlle", meldingTilAlle.MeldingTilAlle); 

// Sende melding til ALLE brukerne i en GRUPPE
const gruppemelding = require('../controllers/meldinger');
router.use("/gruppemelding", gruppemelding.Gruppemelding); 

// Legge til NÅR en melding er lest
const meldingLest = require('../controllers/meldinger');
router.use("/meldingLest", meldingLest.MeldingLest); 

// Teller antall nye medlinger til en bruker
const antallNyeMeldinger = require('../controllers/meldinger');
router.use("/antallNyeMeldinger", antallNyeMeldinger.AntallNyeMeldinger); 

// Grupper: 
// Henter ALLE gruppene (Funker!)
const mineGrupper= require('../controllers/grupper');
router.use("/meldingerMineGrupper", mineGrupper.getMineGrupper); 

// Henter gruppene til en bruker (Ikke lagd enda, venter til vi deler bruker og veileder)
const brukerGrupper= require('../controllers/grupper');
router.use("/brukerGrupper", brukerGrupper.hentBrukerGrupper); 

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


//Lenkebibliotek: 
// Se alle lenkene 
const getLenker = require('../controllers/lenkebibliotek');
router.use("/getLenker", getLenker.getAlleLenker)

// Opprette ny lenke
const addLenke = require('../controllers/lenkebibliotek'); 
router.use("/lenkerNylenke", addLenke.LenkeInput );

// Legg lenke til hos en brukerne
const addLenkeBruker = require('../controllers/lenkebibliotek'); 
router.use("/lenkeAddBruker", addLenkeBruker.AddLenkeBruker );

// Legg lenke til hos en gruppe
const addLenkeGruppe = require('../controllers/lenkebibliotek'); 
router.use("/lenkeAddGruppe", addLenkeGruppe.AddLenkeGruppe );

// Se alle lenkene til en bruker
const visLenkerBruker = require('../controllers/lenkebibliotek'); 
router.use("/visLenkerBruker", visLenkerBruker.VisBrukerLenker );

// se alle lenkene til en gruppe
const visLenkerGruppe= require('../controllers/lenkebibliotek'); 
router.use("/visLenkerGruppe", visLenkerGruppe.VisGruppeLenker );


// Slette lenke hos en bruker
const slettLenkeBruker = require('../controllers/lenkebibliotek'); 
router.use("/slettLenkeBruker", slettLenkeBruker.SlettBrukerLenke );

// Slette lenken hos en gruppe  
const slettLenkeGruppe = require('../controllers/lenkebibliotek'); 
router.use("/slettLenkeGruppe", slettLenkeGruppe.SlettGruppeLenke );

// Endre en lenke
const endreLenke = require('../controllers/lenkebibliotek'); 
router.use("/endreLenke", endreLenke.RedigerLenke );

// Legge til en lenke hos alle brukerne
const leggTilLenkeAlle = require('../controllers/lenkebibliotek'); 
router.use("/leggTilLenkeAlle", leggTilLenkeAlle.LeggTilAlleLenke );

// Liste med lenker hos en bruker
const lenkerForBruker = require('../controllers/lenkebibliotek'); 
router.use("/LenkebibBruker", lenkerForBruker.LenkerBruker );




// Eksporterer denne modellen, så server.js får brukt den
module.exports = router;

