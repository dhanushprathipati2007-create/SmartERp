const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const {
    addCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer,
    addLedgerEntry,
    getCustomerLedger,
    getCustomerStatement,
} = require("../controllers/customerController");

router.post(
    "/",
    authMiddleware,
    addCustomer
);

router.get(
    "/",
    authMiddleware,
    getCustomers
);

router.put(
    "/:id",
    authMiddleware,
    updateCustomer
);

router.delete(
    "/:id",
    authMiddleware,
    deleteCustomer
);

router.post(
    "/ledger",
    authMiddleware,
    addLedgerEntry
);

router.get(
    "/:id/ledger",
    authMiddleware,
    getCustomerLedger
);

router.get(
    "/:id/statement",
    authMiddleware,
    getCustomerStatement
);

module.exports = router;