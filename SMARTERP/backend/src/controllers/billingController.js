const pool = require("../config/db");


exports.createInvoice = async (req, res) => {
    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        const {
            company_id,
            customer_id,
            invoice_date,
            payment_mode,
            items
        } = req.body;

        let subtotal = 0;
        let gstAmount = 0;

        for (const item of items) {

            subtotal += Number(item.quantity) * Number(item.price);

            gstAmount +=
                (Number(item.quantity) *
                    Number(item.price) *
                    Number(item.gst)) / 100;
        }

        const totalAmount = subtotal + gstAmount;

        const invoiceNumber =
            "INV-" +
            Date.now();

        const invoiceResult = await client.query(
            `
            INSERT INTO invoices
            (
                company_id,
                customer_id,
                invoice_number,
                invoice_date,
                subtotal,
                gst_amount,
                total_amount,
                payment_mode,
                status
            )

            VALUES
            (
                $1,$2,$3,$4,$5,$6,$7,$8,'Pending'
            )

            RETURNING *
            `,
            [
                company_id,
                customer_id,
                invoiceNumber,
                invoice_date,
                subtotal,
                gstAmount,
                totalAmount,
                payment_mode
            ]
        );

        const invoice = invoiceResult.rows[0];

        for (const item of items) {

            await client.query(
                `
                INSERT INTO invoice_items
                (
                    invoice_id,
                    item_id,
                    quantity,
                    price,
                    gst,
                    amount
                )

                VALUES
                (
                    $1,$2,$3,$4,$5,$6
                )
                `,
                [
                    invoice.id,
                    item.item_id,
                    item.quantity,
                    item.price,
                    item.gst,
                    item.quantity * item.price
                ]
            );

            await client.query(
                `
                UPDATE stock_items

                SET quantity = quantity - $1

                WHERE id=$2
                `,
                [
                    item.quantity,
                    item.item_id
                ]
            );
        }

        await client.query("COMMIT");

        res.status(201).json(invoice);

    } catch (err) {

        await client.query("ROLLBACK");

        console.error(err);

        res.status(500).json({
            message: "Server Error"
        });

    } finally {

        client.release();

    }
};

// Get All Invoices
exports.getInvoices = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT *
            FROM invoices
            ORDER BY id DESC
        `);

        res.json(result.rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Get Single Invoice
exports.getInvoice = async (req, res) => {
    try {
        const { id } = req.params;

        const invoiceQuery = `
            SELECT
                i.id,
                i.invoice_number,
                i.invoice_date,
                i.subtotal,
                i.gst_amount,
                i.total_amount,
                i.status,

                c.customer_name,
                c.mobile,
                c.address

            FROM invoices i
            JOIN customers c
                ON i.customer_id = c.id

            WHERE i.id = $1
        `;

        const invoiceResult = await pool.query(invoiceQuery, [id]);

        if (invoiceResult.rows.length === 0) {
            return res.status(404).json({
                message: "Invoice not found"
            });
        }

const itemsQuery = `
SELECT
    ii.id,
    s.item_name,
    ii.quantity,
    ii.price,
    ii.gst,
    ii.amount

FROM invoice_items ii

INNER JOIN stock_items s
    ON s.id = ii.item_id

WHERE ii.invoice_id = $1

ORDER BY ii.id
`;

        const itemsResult = await pool.query(itemsQuery, [id]);

        res.json({
            ...invoiceResult.rows[0],
            items: itemsResult.rows
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server Error"
        });
    }
};