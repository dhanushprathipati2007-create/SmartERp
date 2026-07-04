const pool = require("../config/db");

/*
========================================
Create Stock Group
========================================
*/

exports.createStockGroup = async (req, res) => {

    try {

        const {

            group_name,

            description

        } = req.body;

        const result = await pool.query(

            `INSERT INTO stock_groups
            (
                group_name,
                description
            )

            VALUES($1,$2)

            RETURNING *`,

            [

                group_name,

                description

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
Get Stock Groups
========================================
*/

exports.getStockGroups = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT *

            FROM stock_groups

            ORDER BY group_name`

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
Update Stock Group
========================================
*/

exports.updateStockGroup = async (req, res) => {

    try {

        const { id } = req.params;

        const {

            group_name,

            description

        } = req.body;

        const result = await pool.query(

            `UPDATE stock_groups

            SET

            group_name=$1,

            description=$2,

            updated_at=CURRENT_TIMESTAMP

            WHERE id=$3

            RETURNING *`,

            [

                group_name,

                description,

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
Delete Stock Group
========================================
*/

exports.deleteStockGroup = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(

            "DELETE FROM stock_groups WHERE id=$1",

            [id]

        );

        res.json({

            message: "Deleted Successfully"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Server Error"

        });

    }

};