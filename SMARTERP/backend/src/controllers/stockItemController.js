const pool = require("../config/db");

/*
========================================
Create Stock Item
========================================
*/

exports.createStockItem = async (req, res) => {

    try {

        const {

            item_name,
            sku,
            stock_group_id,
            unit_id,
            purchase_price,
            selling_price,
            quantity,
            gst_percentage,
            opening_stock,
            low_stock_alert

        } = req.body;

        if (!item_name || !sku) {

            return res.status(400).json({

                message: "Item Name and SKU are required"

            });

        }

        const result = await pool.query(

            `INSERT INTO stock_items
            (
                item_name,
                sku,
                stock_group_id,
                unit_id,
                purchase_price,
                selling_price,
                quantity,
                gst_percentage,
                opening_stock,
                low_stock_alert
            )

            VALUES
            ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)

            RETURNING *`,

            [

                item_name,
                sku,
                stock_group_id || null,
                unit_id || null,
                purchase_price || 0,
                selling_price || 0,
                quantity || 0,
                gst_percentage || 0,
                opening_stock || 0,
                low_stock_alert || 5

            ]

        );

        res.status(201).json(result.rows[0]);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

/*
========================================
Get Stock Items
========================================
*/

exports.getStockItems = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT

                si.*,

                sg.group_name,

                u.unit_name,

                u.symbol

            FROM stock_items si

            LEFT JOIN stock_groups sg

            ON si.stock_group_id = sg.id

            LEFT JOIN units u

            ON si.unit_id = u.id

            ORDER BY si.item_name`

        );

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

/*
========================================
Update Stock Item
========================================
*/

exports.updateStockItem = async (req, res) => {

    try {

        const { id } = req.params;

        const {

            item_name,
            sku,
            stock_group_id,
            unit_id,
            purchase_price,
            selling_price,
            quantity,
            gst_percentage,
            opening_stock,
            low_stock_alert

        } = req.body;

        const result = await pool.query(

            `UPDATE stock_items

            SET

                item_name=$1,

                sku=$2,

                stock_group_id=$3,

                unit_id=$4,

                purchase_price=$5,

                selling_price=$6,

                quantity=$7,

                gst_percentage=$8,

                opening_stock=$9,

                low_stock_alert=$10,

                updated_at=CURRENT_TIMESTAMP

            WHERE id=$11

            RETURNING *`,

            [

                item_name,
                sku,
                stock_group_id,
                unit_id,
                purchase_price,
                selling_price,
                quantity,
                gst_percentage,
                opening_stock,
                low_stock_alert,
                id

            ]

        );

        res.json(result.rows[0]);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

/*
========================================
Delete Stock Item
========================================
*/

exports.deleteStockItem = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(

            "DELETE FROM stock_items WHERE id=$1",

            [id]

        );

        res.json({

            success: true,

            message: "Stock Item Deleted Successfully"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Server Error"

        });

    }

};

/*
========================================
Search Stock Item
========================================
*/

exports.searchStockItems = async (req, res) => {

    try {

        const { keyword } = req.params;

        const result = await pool.query(

            `SELECT *

            FROM stock_items

            WHERE LOWER(item_name)

            LIKE LOWER($1)

            ORDER BY item_name`,

            [

                `%${keyword}%`

            ]

        );

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Server Error"

        });

    }

};