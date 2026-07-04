const db = require("../config/db");

exports.createSale = async (req, res) => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const {
      voucher_no,
      voucher_date,
      customer_id,
      total_amount,
      gst_amount,
      grand_total,
      remarks,
      items,
    } = req.body;

    const saleResult = await client.query(
      `INSERT INTO sales_vouchers
      (
        voucher_no,
        voucher_date,
        customer_id,
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
        customer_id,
        total_amount,
        gst_amount,
        grand_total,
        remarks,
      ]
    );

    const salesId = saleResult.rows[0].id;

    for (const item of items) {

      // Check stock
      const stock = await client.query(
        `SELECT quantity
         FROM stock_items
         WHERE id = $1`,
        [item.stock_item_id]
      );

      if (stock.rows.length === 0) {
        throw new Error("Stock item not found");
      }

      if (stock.rows[0].quantity < item.quantity) {
        throw new Error(
          `Insufficient stock for item ${item.stock_item_id}`
        );
      }

      // Save sales item
      await client.query(
        `INSERT INTO sales_items
        (
          sales_id,
          stock_item_id,
          quantity,
          selling_price,
          amount
        )
        VALUES ($1,$2,$3,$4,$5)`,
        [
          salesId,
          item.stock_item_id,
          item.quantity,
          item.selling_price,
          item.amount,
        ]
      );

      // Reduce stock
      await client.query(
        `UPDATE stock_items
         SET quantity = quantity - $1
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
      message: "Sales Voucher Saved Successfully",
      salesId,
    });

  } catch (error) {

    await client.query("ROLLBACK");

    res.status(500).json({
      success: false,
      message: error.message,
    });

  } finally {
    client.release();
  }
};