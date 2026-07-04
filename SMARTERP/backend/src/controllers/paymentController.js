const db = require("../config/db");

exports.createPayment = async (req, res) => {
  try {
    const {
      voucher_no,
      voucher_date,
      ledger_id,
      payment_mode,
      amount,
      remarks,
    } = req.body;

    const result = await db.query(
      `INSERT INTO payment_vouchers
      (
        voucher_no,
        voucher_date,
        ledger_id,
        payment_mode,
        amount,
        remarks
      )
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *`,
      [
        voucher_no,
        voucher_date,
        ledger_id,
        payment_mode,
        amount,
        remarks,
      ]
    );

    res.status(201).json({
      success: true,
      payment: result.rows[0],
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

exports.getPayments = async (req, res) => {
  try {

    const result = await db.query(
      `SELECT * FROM payment_vouchers
       ORDER BY voucher_date DESC`
    );

    res.json(result.rows);

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};