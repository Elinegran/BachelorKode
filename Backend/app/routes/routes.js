//Utviklet av: Gruppe 2
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

// Eksporterer denne modellen, så server.js får brukt den
module.exports = router;