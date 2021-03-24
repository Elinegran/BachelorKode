
const express = require('express');
const router = express.Router();


//Bruker:
const brukerQueries = require('../controllers/bruker');
router.use("/brukerGetAll", brukerQueries.getAll);

//Kalender:
const kalenderAlle = require('../controllers/kalender');
router.use("/kalenderAlleAvtaler", kalenderAlle.getKalenderAlle);

const avtaleNy = require('../controllers/nyAvtale');
router.use("/nyAvtale", avtaleNy.NyAvtale);

//Meldinger:

// Alle meldingene som en bruker har fått
const mineMeldinger = require('../controllers/meldinger');
router.use("/meldingerMineMeldinger", mineMeldinger.getMineMeldinger);

 // Samtalen mellom 2 brukere
const minSamtale = require('../controllers/samtale');
router.use("/meldingerMinSamtale", minSamtale.getMinSamtale); 

//Vise alle grupper
const mineGrupper= require('../controllers/grupper');
router.use("/meldingerMineGrupper", mineGrupper.getMineGrupper); 

const addGruppe = require('../controllers/nyeGrupper'); 
router.use("/grupperNyeGrupper", addGruppe.GruppeInput );

const addGruppemedlem = require('../controllers/nyttMedlem'); 
router.use("/grupperNyeGruppemedlemmer", addGruppemedlem.MedlemInput)

const getGruppemedlem = require('../controllers/gruppemedlemmer');
router.use("/gruppeGetMedlemmer", getGruppemedlem.getMedlem)

module.exports = router;
