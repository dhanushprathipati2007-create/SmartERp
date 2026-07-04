const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
    "/api/auth",
    require("./routes/authRoutes")
);

app.use(
    "/api/admin",
    require("./routes/adminRoutes")
);

app.use(
    "/api/companies",
    require("./routes/companyRoutes")
);

app.use(
    "/api/customers",
    require("./routes/customerRoutes")
);


app.use(
    "/api/dashboard",
    require("./routes/dashboardRoutes")
);

app.use(
    "/api/ledgers", 
    require("./routes/ledgerRoutes")
);

app.use(
    "/api/groups",
    require("./routes/groupRoutes")
);

app.use(
    "/api/units",
    require("./routes/unitRoutes")
);

app.use(
    "/api/stock-groups",
    require("./routes/stockGroupRoutes")
);

app.use(
    "/api/stock-items",
    require("./routes/stockItemRoutes")
);

app.use(
    "/api/purchase",
    require("./routes/purchaseRoutes")
);

app.use(
    "/api/sales",
    require("./routes/salesRoutes")
);

app.use(
    "/api/payments",
    require("./routes/paymentRoutes")
);

app.use(
    "/api/receipts",
    require("./routes/receiptRoutes")
);

app.use(
    "/api/contras",
    require("./routes/contraRoutes")
);

app.use(
    "/api/journals",
    require("./routes/journalRoutes")
);

app.use(
    "/api/credit-notes",
    require("./routes/creditRoutes")
);

app.use(
    "/api/dedit-notes",
    require("./routes/debitRoutes")
);

app.use(
    "/api/invoices",
    require("./routes/invoiceRoutes")
);

app.use(
    "/api/billing",
    require("./routes/billingRoutes")
);

app.get("/", (req, res) => {
    res.json({
    message: "SmartERP API Running",
    });
});

app.get("/test", (req, res) => {
    res.json({
    success: true,
    message: "Backend Working"
    });
});

module.exports = app;