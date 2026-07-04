const express = require("express");

const router = express.Router();

const ledgerController = require("../controllers/ledgerController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", ledgerController.createLedger);

router.get("/", ledgerController.getLedgers);

router.put("/:id", ledgerController.updateLedger);

router.delete("/:id", ledgerController.deleteLedger);

router.get("/search/:keyword", ledgerController.searchLedger);

module.exports = router;