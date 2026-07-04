const pool = require("../config/db");

/*
========================================
Create Company
========================================
*/
exports.createCompany = async (req, res) => {
    try {
    const {
        company_name,
        address,
        gst_number,
        financial_year,
        state,
        contact_number,
        email,
    } = req.body;

    const result = await pool.query(
        `
        INSERT INTO companies
        (
        company_name,
        address,
        gst_number,
        financial_year,
        state,
        contact_number,
        email
        )
        VALUES
        ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
        `,
        [
        company_name,
        address,
        gst_number,
        financial_year,
        state,
        contact_number,
        email,
        ]
    );

    res.status(201).json(result.rows[0]);

    } catch (error) {
    console.error(error);

    res.status(500).json({
        message: "Server Error",
    });
    }
};

/*
========================================
Assign Company To User
(Maximum 5 Companies)
========================================
*/
exports.assignCompany = async (req, res) => {
    try {
    const { userId, companyId } = req.body;

    // Check how many companies user already has
    const countResult = await pool.query(
        `
        SELECT COUNT(*) 
        FROM user_companies
        WHERE user_id = $1
        `,
        [userId]
    );

    const companyCount = parseInt(
        countResult.rows[0].count
    );

    if (companyCount >= 5) {
        return res.status(400).json({
        message: "Maximum 5 companies allowed",
        });
    }

    // Check if company already assigned
    const existingAssignment = await pool.query(
        `
      SELECT *
        FROM user_companies
        WHERE user_id = $1
        AND company_id = $2
        `,
        [userId, companyId]
    );

    if (existingAssignment.rows.length > 0) {
        return res.status(400).json({
        message: "Company already assigned",
        });
    }

    // Assign company
    await pool.query(
        `
        INSERT INTO user_companies
        (
        user_id,
        company_id
        )
        VALUES
        ($1,$2)
        `,
        [userId, companyId]
    );

    res.status(200).json({
        success: true,
        message: "Company Assigned Successfully",
    });

    } catch (error) {
    console.error(error);

    res.status(500).json({
        message: "Server Error",
    });
    }
};
/*
========================================
Get companies
========================================
*/
exports.getMyCompanies = async (req, res) => {
    try {
    const userId = req.user.id;

const result = await pool.query(
`
SELECT
    c.id,
    c.company_name,
    c.address,
    c.gst_number,
    c.financial_year,
    c.state,
    c.contact_number,
    c.email,
    c.created_at
FROM companies c
INNER JOIN user_companies uc
ON c.id = uc.company_id
WHERE uc.user_id = $1
ORDER BY c.company_name
`,
[userId]
);

    res.status(200).json(result.rows);

    } catch (error) {
    console.error(error);

    res.status(500).json({
        message: "Server Error",
    });
    }
};
/*
========================================
Alter companies
========================================
*/

exports.updateCompany = async (req, res) => {
    try {
    const { id } = req.params;

    const {
        company_name,
        address,
        gst_number,
        financial_year,
        state,
        contact_number,
        email,
    } = req.body;

    const result = await pool.query(
        `
        UPDATE companies
        SET
        company_name = $1,
        address = $2,
        gst_number = $3,
        financial_year = $4,
        state = $5,
        contact_number = $6,
        email = $7
        WHERE id = $8
      RETURNING *
        `,
        [
        company_name,
        address,
        gst_number,
        financial_year,
        state,
        contact_number,
        email,
        id,
        ]
    );

    res.json(result.rows[0]);

    } catch (error) {
    console.error(error);

    res.status(500).json({
        message: "Server Error",
    });
    }
};
/*
========================================
delete companies
========================================
*/
exports.deleteCompany = async (req, res) => {
    try {
    const { id } = req.params;

    await pool.query(
        `
        DELETE FROM user_companies
        WHERE company_id = $1
        `,
        [id]
    );

    await pool.query(
        `
        DELETE FROM companies
        WHERE id = $1
        `,
        [id]
    );

    res.json({
        success: true,
        message: "Company Deleted Successfully",
    });

    } catch (error) {
    console.error(error);

    res.status(500).json({
        message: "Server Error",
    });
    }
};

/*
========================================
select companies
========================================
*/
exports.selectCompany = async (req, res) => {
    try {
    const { companyId } = req.body;

    const userId = req.user.id;

    const result = await pool.query(
        `
        SELECT c.*
        FROM companies c
        INNER JOIN user_companies uc
        ON c.id = uc.company_id
        WHERE c.id = $1
        AND uc.user_id = $2
        `,
        [companyId, userId]
    );

    if (result.rows.length === 0) {
        return res.status(404).json({
        message: "Company Not Assigned To User",
        });
    }

    res.status(200).json({
        success: true,
        message: "Company Selected Successfully",
        company: result.rows[0],
    });

    } catch (error) {
    console.error(error);

    res.status(500).json({
        message: "Server Error",
    });
    }
};