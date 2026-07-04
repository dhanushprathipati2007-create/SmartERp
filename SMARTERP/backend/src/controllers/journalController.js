const db = require("../config/db");

/*
========================================
Create Journal Voucher
========================================
*/

exports.createJournal = async (req, res) => {

    try {

        const {
            voucher_no,
            voucher_date,
            debit_ledger_id,
            credit_ledger_id,
            amount,
            remarks
        } = req.body;

        if (debit_ledger_id === credit_ledger_id) {
            return res.status(400).json({
                success: false,
                message: "Debit and Credit Ledger cannot be the same"
            });
        }

        const result = await db.query(

            `INSERT INTO journal_vouchers
            (
                voucher_no,
                voucher_date,
                debit_ledger_id,
                credit_ledger_id,
                amount,
                remarks
            )
            VALUES
            ($1,$2,$3,$4,$5,$6)
            RETURNING *`,

            [
                voucher_no,
                voucher_date,
                debit_ledger_id,
                credit_ledger_id,
                amount,
                remarks
            ]

        );

        res.status(201).json({
            success: true,
            journal: result.rows[0]
        });

    }
    catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


/*
========================================
Get All Journal Vouchers
========================================
*/

exports.getJournals = async (req, res) => {

    try {

        const result = await db.query(

            `SELECT
                j.id,
                j.voucher_no,
                j.voucher_date,

                dl.ledger_name AS debit_ledger,

                cl.ledger_name AS credit_ledger,

                j.amount,
                j.remarks,
                j.created_at

            FROM journal_vouchers j

            JOIN ledgers dl
            ON j.debit_ledger_id = dl.id

            JOIN ledgers cl
            ON j.credit_ledger_id = cl.id

            ORDER BY j.created_at DESC`

        );

        res.json(result.rows);

    }

    catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


/*
========================================
Update Journal Voucher
========================================
*/

exports.updateJournal = async (req, res) => {

    try {

        const { id } = req.params;

        const {

            voucher_no,
            voucher_date,
            debit_ledger_id,
            credit_ledger_id,
            amount,
            remarks

        } = req.body;

        const result = await db.query(

            `UPDATE journal_vouchers

            SET

            voucher_no=$1,
            voucher_date=$2,
            debit_ledger_id=$3,
            credit_ledger_id=$4,
            amount=$5,
            remarks=$6

            WHERE id=$7

            RETURNING *`,

            [

                voucher_no,
                voucher_date,
                debit_ledger_id,
                credit_ledger_id,
                amount,
                remarks,
                id

            ]

        );

        res.json({

            success: true,
            journal: result.rows[0]

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};



/*
========================================
Delete Journal Voucher
========================================
*/

exports.deleteJournal = async (req, res) => {

    try {

        const { id } = req.params;

        await db.query(

            `DELETE FROM journal_vouchers
             WHERE id=$1`,

            [id]

        );

        res.json({

            success: true,
            message: "Journal Voucher Deleted Successfully"

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};