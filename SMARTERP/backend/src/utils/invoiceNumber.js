const db = require("../config/db");

exports.generateInvoiceNo = async (type) => {

    const year = new Date().getFullYear();

    let prefix = "GST";

    if (type === "Quotation")
        prefix = "QT";

    if (type === "Estimate")
        prefix = "EST";

    if (type === "Proforma")
        prefix = "PI";

    const result = await db.query(
        `SELECT COUNT(*) FROM invoice_master
         WHERE invoice_type=$1`,
        [type]
    );

    const count = Number(result.rows[0].count) + 1;

    return `${prefix}-${year}-${String(count).padStart(4, "0")}`;

};