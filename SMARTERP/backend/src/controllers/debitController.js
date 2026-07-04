const db=require("../config/db");

/*
========================================
Create Debit Note
========================================
*/

exports.createDebitNote=async(req,res)=>{

const client=await db.connect();

try{

await client.query("BEGIN");

const{

debit_note_no,
debit_note_date,
purchase_id,
supplier_id,
amount,
remarks,
items

}=req.body;

const debit=await client.query(

`INSERT INTO debit_notes

(

debit_note_no,

debit_note_date,

purchase_id,

supplier_id,

amount,

remarks

)

VALUES($1,$2,$3,$4,$5,$6)

RETURNING *`,

[

debit_note_no,
debit_note_date,
purchase_id,
supplier_id,
amount,
remarks

]

);

// Reduce Stock

for(const item of items){

await client.query(

`UPDATE stock_items

SET quantity=quantity-$1

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

debitNote:debit.rows[0]

});

}catch(err){

await client.query("ROLLBACK");

res.status(500).json({

message:err.message

});

}

finally{

client.release();

}

};

/*
========================================
Get Debit Notes
========================================
*/

exports.getDebitNotes=async(req,res)=>{

try{

const result=await db.query(

`SELECT

dn.*,

s.supplier_name,

pv.voucher_no

FROM debit_notes dn

JOIN suppliers s

ON dn.supplier_id=s.id

JOIN purchase_vouchers pv

ON dn.purchase_id=pv.id

ORDER BY dn.created_at DESC`

);

res.json(result.rows);

}catch(err){

res.status(500).json({

message:err.message

});

}

};

/*
========================================
Delete Debit Note
========================================
*/

exports.deleteDebitNote=async(req,res)=>{

try{

await db.query(

`DELETE FROM debit_notes

WHERE id=$1`,

[req.params.id]

);

res.json({

success:true,

message:"Deleted Successfully"

});

}catch(err){

res.status(500).json({

message:err.message

});

}

};