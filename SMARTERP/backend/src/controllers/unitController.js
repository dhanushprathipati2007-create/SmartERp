const pool = require("../config/db");

/*
==================================
Create Unit
==================================
*/

exports.createUnit = async (req, res) => {

    try {

        const {

            unit_name,

            symbol,

            description

        } = req.body;

        const result = await pool.query(

            `INSERT INTO units

            (
                unit_name,
                symbol,
                description
            )

            VALUES($1,$2,$3)

            RETURNING *`,

            [

                unit_name,

                symbol,

                description

            ]

        );

        res.status(201).json(result.rows[0]);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message:"Server Error"

        });

    }

};

/*
==================================
Get Units
==================================
*/

exports.getUnits = async(req,res)=>{

    try{

        const result=await pool.query(

            `SELECT *

            FROM units

            ORDER BY unit_name`

        );

        res.json(result.rows);

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            message:"Server Error"

        });

    }

};

/*
==================================
Update
==================================
*/

exports.updateUnit=async(req,res)=>{

    try{

        const{id}=req.params;

        const{

            unit_name,

            symbol,

            description

        }=req.body;

        const result=await pool.query(

            `UPDATE units

            SET

            unit_name=$1,

            symbol=$2,

            description=$3,

            updated_at=CURRENT_TIMESTAMP

            WHERE id=$4

            RETURNING *`,

            [

                unit_name,

                symbol,

                description,

                id

            ]

        );

        res.json(result.rows[0]);

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            message:"Server Error"

        });

    }

};

/*
==================================
Delete
==================================
*/

exports.deleteUnit=async(req,res)=>{

    try{

        const{id}=req.params;

        await pool.query(

            "DELETE FROM units WHERE id=$1",

            [id]

        );

        res.json({

            message:"Deleted"

        });

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            message:"Server Error"

        });

    }

};