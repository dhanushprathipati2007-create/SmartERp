const db = require("../config/db");

const {
    generateInvoiceNo
} = require("../utils/invoiceNumber");

exports.createInvoice = async (req, res) => {

    const client = await db.connect();

    try {

        await client.query("BEGIN");

        const {

            invoice_type,

            sales_id,

            customer_id,

            invoice_date,

            subtotal,

            gst_amount,

            discount,

            grand_total,

            remarks,

            items

        } = req.body;

        const invoiceNo =
            await generateInvoiceNo(invoice_type);

        const invoice = await client.query(

            `INSERT INTO invoice_master

            (

            invoice_no,

            invoice_type,

            sales_id,

            customer_id,

            invoice_date,

            subtotal,

            gst_amount,

            discount,

            grand_total,

            remarks

            )

            VALUES

            ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)

            RETURNING *`,

            [

                invoiceNo,

                invoice_type,

                sales_id,

                customer_id,

                invoice_date,

                subtotal,

                gst_amount,

                discount,

                grand_total,

                remarks

            ]

        );

        const invoiceId =
            invoice.rows[0].id;

        for (const item of items) {

            await client.query(

                `INSERT INTO invoice_items

                (

                invoice_id,

                stock_item_id,

                quantity,

                rate,

                gst_percentage,

                amount

                )

                VALUES

                ($1,$2,$3,$4,$5,$6)`,

                [

                    invoiceId,

                    item.stock_item_id,

                    item.quantity,

                    item.rate,

                    item.gst_percentage,

                    item.amount

                ]

            );

        }

        await client.query("COMMIT");

        res.status(201).json({

            success: true,

            invoice: invoice.rows[0]

        });

    }

    catch (err) {

        await client.query("ROLLBACK");

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

    finally {

        client.release();

    }

};

exports.getInvoices = async (req, res) => {

    try {

        const result = await db.query(

            `SELECT

            im.*,

            c.customer_name

            FROM invoice_master im

            LEFT JOIN customers c

            ON im.customer_id = c.id

            ORDER BY im.created_at DESC`

        );

        res.json(result.rows);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

exports.getInvoiceById = async (req, res) => {

    try {

        const invoice = await db.query(
            `SELECT
                im.*,
                c.customer_name,
                c.mobile,
                c.address
            FROM invoice_master im
            LEFT JOIN customers c
            ON im.customer_id = c.id
            WHERE im.id = $1`,

            [req.params.id]

        );

        const items = await db.query(

            `SELECT

            ii.*,

            s.item_name

            FROM invoice_items ii

            JOIN stock_items s

            ON ii.stock_item_id=s.id

            WHERE invoice_id=$1`,

            [req.params.id]

        );

        res.json({

            invoice: invoice.rows[0],

            items: items.rows

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

exports.deleteInvoice = async (req, res) => {

    try {

        await db.query(

            `DELETE FROM invoice_master

             WHERE id=$1`,

            [

                req.params.id

            ]

        );

        res.json({

            success: true,

            message: "Invoice Deleted"

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};