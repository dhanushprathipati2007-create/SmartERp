const db = require("../config/db");

/*
========================================
Create Credit Note
========================================
*/

exports.createCreditNote = async (req, res) => {

    const client = await db.connect();

    try {

        await client.query("BEGIN");

        const {

            credit_note_no,
            credit_note_date,
            sales_id,
            customer_id,
            amount,
            remarks,
            items

        } = req.body;

        const credit = await client.query(

            `INSERT INTO credit_notes
            (
                credit_note_no,
                credit_note_date,
                sales_id,
                customer_id,
                amount,
                remarks
            )

            VALUES($1,$2,$3,$4,$5,$6)

            RETURNING *`,

            [

                credit_note_no,
                credit_note_date,
                sales_id,
                customer_id,
                amount,
                remarks

            ]

        );

        // Increase Stock

        for(const item of items){

            await client.query(

                `UPDATE stock_items

                 SET quantity = quantity + $1

                 WHERE id=$2`,

                 [

                    item.quantity,

                    item.stock_item_id

                 ]

            );

        }

        await client.query("COMMIT");

        res.status(201).json({

            success:true,

            creditNote:credit.rows[0]

        });

    }

    catch(err){

        await client.query("ROLLBACK");

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

    finally{

        client.release();

    }

};


/*
========================================
Get Credit Notes
========================================
*/

exports.getCreditNotes = async(req,res)=>{

    try{

        const result = await db.query(

            `SELECT

            cn.*,

            c.customer_name,

            sv.voucher_no

            FROM credit_notes cn

            JOIN customers c

            ON cn.customer_id=c.id

            JOIN sales_vouchers sv

            ON cn.sales_id=sv.id

            ORDER BY cn.created_at DESC`

        );

        res.json(result.rows);

    }

    catch(err){

        res.status(500).json({

            message:err.message

        });

    }

};


/*
========================================
Delete Credit Note
========================================
*/

exports.deleteCreditNote = async(req,res)=>{

    try{

        await db.query(

            `DELETE FROM credit_notes

             WHERE id=$1`,

             [

                req.params.id

             ]

        );

        res.json({

            success:true,

            message:"Deleted Successfully"

        });

    }

    catch(err){

        res.status(500).json({

            message:err.message

        });

    }

};