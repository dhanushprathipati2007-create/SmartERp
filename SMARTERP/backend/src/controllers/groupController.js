const pool = require("../config/db");

/*
=========================================
Create Group
=========================================
*/

exports.createGroup = async (req, res) => {

    try {

        const {

            group_name,

            group_type,

            parent_group,

            description

        } = req.body;

        if (!group_name || !group_type) {

            return res.status(400).json({

                message: "Group Name and Type are required"

            });

        }

        const result = await pool.query(

            `INSERT INTO groups

            (
                group_name,
                group_type,
                parent_group,
                description
            )

            VALUES($1,$2,$3,$4)

            RETURNING *`,

            [

                group_name,

                group_type,

                parent_group || null,

                description || null

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
=========================================
Get All Groups
=========================================
*/

exports.getGroups = async (req, res) => {

    try {

       const result = await pool.query(`
    SELECT
        id,
        group_name,
        group_type,
        parent_group,
        description
    FROM groups
    ORDER BY group_name
`);

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
=========================================
Update Group
=========================================
*/

exports.updateGroup = async (req, res) => {

    try {

        const { id } = req.params;

        const {

            group_name,

            group_type,

            parent_group,

            description

        } = req.body;

        const result = await pool.query(

            `UPDATE groups

            SET

            group_name=$1,

            group_type=$2,

            parent_group=$3,

            description=$4,

            WHERE id=$5

            RETURNING *`,

            [

                group_name,

                group_type,

                parent_group || null,

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
=========================================
Delete Group
=========================================
*/

exports.deleteGroup = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(

            "DELETE FROM groups WHERE id=$1",

            [id]

        );

        res.json({

            success: true,

            message: "Group Deleted Successfully"

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
=========================================
Search Groups
=========================================
*/

exports.searchGroup = async (req, res) => {

    try {

        const { keyword } = req.params;

        const result = await pool.query(

            `SELECT *

            FROM groups

            WHERE LOWER(group_name)

            LIKE LOWER($1)

            ORDER BY group_name`,

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