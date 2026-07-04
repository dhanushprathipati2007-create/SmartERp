const express = require("express");

const router = express.Router();

const journalController = require("../controllers/journalController");

router.post("/", journalController.createJournal);

router.get("/", journalController.getJournals);

router.put("/:id", journalController.updateJournal);

router.delete("/:id", journalController.deleteJournal);

module.exports = router;