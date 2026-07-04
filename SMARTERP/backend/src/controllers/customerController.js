const pool = require("../config/db");

/*
========================================
Add Customer
========================================
*/
exports.addCustomer = async (req, res) => {
    try {
    const {
        company_id,
        customer_name,
        mobile,
        email,
    gst_number,
    state,
    address,
    } = req.body;

    const result = await pool.query(
        `
        INSERT INTO customers
        (
        company_id,
customer_name,
mobile,
email,
gst_number,
state,
address
        )
        VALUES
        ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
        `,
        [
        company_id,
customer_name,
mobile,
email,
gst_number,
state,
address,
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
Get All Customers
========================================
*/
exports.getCustomers = async (req, res) => {
    try {
    const result = await pool.query(
        `
      SELECT *
        FROM customers
        ORDER BY customer_name
        `
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
Update Customer
========================================
*/
exports.updateCustomer = async (req, res) => {
    try {
    const { id } = req.params;

    const {
    customer_name,
    mobile,
    email,
    gst_number,
    state,
    address,
    outstanding_balance,
    } = req.body;

    const result = await pool.query(
        `
        UPDATE customers
        SET
customer_name = $1,
mobile = $2,
email = $3,
gst_number = $4,
state = $5,
address = $6,
outstanding_balance = $7
WHERE id = $8
      RETURNING *
        `,
        [
customer_name,
mobile,
email,
gst_number,
state,
address,
outstanding_balance,
id,
        ]
    );

    res.status(200).json(result.rows[0]);

    } catch (error) {
    console.error(error);

    res.status(500).json({
        message: "Server Error",
    });
    }
};

/*
========================================
Delete Customer
========================================
*/
exports.deleteCustomer = async (req, res) => {
    try {
    const { id } = req.params;

    await pool.query(
        `
        DELETE FROM customers
        WHERE id = $1
        `,
        [id]
    );

    res.status(200).json({
        success: true,
        message: "Customer Deleted Successfully",
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
Add Ledger Entry
========================================
*/
exports.addLedgerEntry = async (req, res) => {
    try {

    const {
        customer_id,
        transaction_date,
        particulars,
        debit,
        credit,
    } = req.body;

    const previousBalance =
        await pool.query(
        `
        SELECT balance
        FROM customer_ledger
        WHERE customer_id = $1
        ORDER BY created_at DESC
        LIMIT 1
        `,
        [customer_id]
        );

    let currentBalance = 0;

    if (previousBalance.rows.length > 0) {
        currentBalance =
        parseFloat(
            previousBalance.rows[0].balance
        );
    }

    const newBalance =
        currentBalance +
        parseFloat(debit || 0) -
        parseFloat(credit || 0);

    const result =
        await pool.query(
        `
        INSERT INTO customer_ledger
        (
            customer_id,
            transaction_date,
            particulars,
            debit,
            credit,
            balance
        )
        VALUES
        ($1,$2,$3,$4,$5,$6)
        RETURNING *
        `,
        [
            customer_id,
            transaction_date,
            particulars,
            debit || 0,
            credit || 0,
            newBalance,
        ]
        );

    await pool.query(
        `
        UPDATE customers
        SET outstanding_balance = $1
        WHERE id = $2
        `,
        [newBalance, customer_id]
    );

    res.status(201).json(
        result.rows[0]
    );

    } catch (error) {

    console.error(error);

    res.status(500).json({
        message: "Server Error",
    });

    }
};

/*
========================================
Customer Ledger
========================================
*/
exports.getCustomerLedger =
    async (req, res) => {

    try {

        const { id } = req.params;

        const result =
        await pool.query(
            `
          SELECT *
            FROM customer_ledger
            WHERE customer_id = $1
            ORDER BY transaction_date
            `,
            [id]
        );

        res.status(200).json(
        result.rows
        );

    } catch (error) {

        console.error(error);

        res.status(500).json({
        message: "Server Error",
        });

    }

    };

    /*
========================================
Customer Statement
========================================
*/
exports.getCustomerStatement =
    async (req, res) => {

    try {

        const { id } = req.params;

        const customer =
        await pool.query(
            `
          SELECT *
            FROM customers
            WHERE id = $1
            `,
            [id]
        );

        const ledger =
        await pool.query(
            `
          SELECT *
            FROM customer_ledger
            WHERE customer_id = $1
            ORDER BY transaction_date
            `,
            [id]
        );

        res.status(200).json({
        customer:
            customer.rows[0],

        statement:
            ledger.rows,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
        message: "Server Error",
        });

    }

    };