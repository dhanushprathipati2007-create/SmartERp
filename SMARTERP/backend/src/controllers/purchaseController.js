const db = require("../config/db");

exports.createPurchase = async (req, res) => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const {
      voucher_no,
      voucher_date,
      supplier_id,
      total_amount,
      gst_amount,
      grand_total,
      remarks,
      items,
    } = req.body;

    // Insert Purchase Voucher
    const purchaseResult = await client.query(
      `INSERT INTO purchase_vouchers
      (
        voucher_no,
        voucher_date,
        supplier_id,
        total_amount,
        gst_amount,
        grand_total,
        remarks
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING id`,
      [
        voucher_no,
        voucher_date,
        supplier_id,
        total_amount,
        gst_amount,
        grand_total,
        remarks,
      ]
    );

    const purchaseId = purchaseResult.rows[0].id;

    // Insert Items & Update Stock
    for (const item of items) {

      await client.query(
        `INSERT INTO purchase_items
        (
          purchase_id,
          stock_item_id,
          quantity,
          purchase_price,
          amount
        )
        VALUES ($1,$2,$3,$4,$5)`,
        [
          purchaseId,
          item.stock_item_id,
          item.quantity,
          item.purchase_price,
          item.amount,
        ]
      );

      // Increase Stock
      await client.query(
        `UPDATE stock_items
         SET quantity = quantity + $1
         WHERE id = $2`,
        [
          item.quantity,
          item.stock_item_id,
        ]
      );

    }

    await client.query("COMMIT");

    res.status(201).json({
      success: true,
      message: "Purchase Voucher Saved Successfully",
      purchaseId,
    });

  } catch (error) {

    await client.query("ROLLBACK");

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  } finally {

    client.release();

  }
};