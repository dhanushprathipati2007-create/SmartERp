const express = require("express");

const router = express.Router();

const billing = require("../controllers/billingController");

router.post("/", billing.createInvoice);

router.get("/", billing.getInvoices);

router.get("/:id", billing.getInvoice);

module.exports = router;