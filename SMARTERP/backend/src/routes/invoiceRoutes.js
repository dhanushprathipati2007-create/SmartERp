const express = require("express");

const router = express.Router();

const controller =
require("../controllers/invoiceController");

router.post("/", controller.createInvoice);

router.get("/", controller.getInvoices);

router.get("/:id", controller.getInvoiceById);

router.delete("/:id", controller.deleteInvoice);

module.exports = router;