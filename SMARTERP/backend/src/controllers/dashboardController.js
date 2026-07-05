const pool = require("../config/db");

exports.getDashboardStats = async (req, res) => {
    try {

    const companyCount = await pool.query(
        "SELECT COUNT(*) FROM companies"
    );

    const customerCount = await pool.query(
    "SELECT COUNT(*) FROM customers"
    );

    const ledgerCount = await pool.query(
    "SELECT COUNT(*) FROM ledgers"
    );
    
    const activeCompany = await pool.query(
      "SELECT * FROM companies LIMIT 1"
    );

    const stockItemCount = await pool.query(
  "SELECT COUNT(*) FROM stock_items"
);


    const company = activeCompany.rows[0];

    res.json({
        totalCompanies: companyCount.rows[0].count,
        totalCustomers: customerCount.rows[0].count,
        totalLedgers: ledgerCount.rows[0].count,
        totalStockItems: stockItemCount.rows[0].count,
        companyName: company?.company_name || "",
        address: company?.address || "",
        gstNumber: company?.gst_number || "",
        financialYear: company?.financial_year || "",
        state: company?.state || "",
        contactNumber: company?.contact_number || "",
        email: company?.email || "",
    });

    } catch (error) {
    console.error(error);

    res.status(500).json({
        message: "Server Error"
    });
    }
};