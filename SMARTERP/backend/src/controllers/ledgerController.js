const pool = require("../config/db");

// Create Ledger

exports.createLedger = async (req, res) => {

    try {

        const {

            ledger_name,
            ledger_type,
            opening_balance,
            company_id

        } = req.body;

        if (!ledger_name || !ledger_type || !company_id) {

            return res.status(400).json({

                message: "Required fields missing"

            });

        }

        const result = await pool.query(

            `INSERT INTO ledgers
            (
            ledger_name,
            ledger_type,
            opening_balance,
            company_id
            )

            VALUES($1,$2,$3,$4)

            RETURNING *`,

            [

                ledger_name,
                ledger_type,
                opening_balance || 0,
                company_id

            ]

        );

        res.status(201).json(result.rows[0]);

    }

catch (err) {

    console.log(err);

    res.status(500).json({

        error: err.message

    });

}

};

// Get All Ledgers

exports.getLedgers = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT
            l.*,
            c.company_name

            FROM ledgers l

            JOIN companies c
            ON l.company_id=c.id

            ORDER BY l.id DESC`
        );

        res.json(result.rows);

    }
catch (err) {

    console.log(err);

    res.status(500).json({

        error: err.message

    });

}

};

// Update Ledger

exports.updateLedger = async (req, res) => {

    try {

        const { id } = req.params;

        const {

            ledger_name,
            ledger_type,
            opening_balance

        } = req.body;

        const result = await pool.query(

            `UPDATE ledgers

            SET

            ledger_name=$1,

            ledger_type=$2,

            opening_balance=$3

            WHERE id=$4

            RETURNING *`,

            [

                ledger_name,

                ledger_type,

                opening_balance,

                id

            ]

        );

        res.json(result.rows[0]);

    }

catch (err) {

    console.log(err);

    res.status(500).json({

        error: err.message

    });

}

};

// Delete Ledger

exports.deleteLedger = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(

            "DELETE FROM ledgers WHERE id=$1",

            [id]

        );

        res.json({

            message: "Ledger Deleted"

        });

    }

catch (err) {

    console.log(err);

    res.status(500).json({

        error: err.message

    });

}

};

// Search Ledger

exports.searchLedger = async (req, res) => {

    try {

        const { keyword } = req.params;

        const result = await pool.query(

            `SELECT *

            FROM ledgers

            WHERE LOWER(ledger_name)

            LIKE LOWER($1)`,

            [

                `%${keyword}%`

            ]

        );

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);

    }

};