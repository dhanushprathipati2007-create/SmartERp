const db=require("../config/db");

exports.createContra=async(req,res)=>{

try{

const{

voucher_no,
voucher_date,
from_ledger_id,
to_ledger_id,
amount,
remarks

}=req.body;

if(from_ledger_id===to_ledger_id){

return res.status(400).json({

message:"From and To ledger cannot be same"

});

}

const result=await db.query(

`INSERT INTO contra_vouchers

(voucher_no,voucher_date,from_ledger_id,to_ledger_id,amount,remarks)

VALUES($1,$2,$3,$4,$5,$6)

RETURNING *`,

[
voucher_no,
voucher_date,
from_ledger_id,
to_ledger_id,
amount,
remarks
]

);

res.status(201).json(result.rows[0]);

}catch(err){

res.status(500).json({

message:err.message

});

}

};

exports.getContras=async(req,res)=>{

const result=await db.query(

`SELECT * FROM contra_vouchers
ORDER BY voucher_date DESC`

);

res.json(result.rows);

};