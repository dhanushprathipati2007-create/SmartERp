const express=require("express");

const router=express.Router();

const controller=require("../controllers/debitController");

router.post("/",controller.createDebitNote);

router.get("/",controller.getDebitNotes);

router.delete("/:id",controller.deleteDebitNote);

module.exports=router;