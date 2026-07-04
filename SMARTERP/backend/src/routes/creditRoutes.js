const express=require("express");

const router=express.Router();

const controller=require("../controllers/creditController");

router.post("/",controller.createCreditNote);

router.get("/",controller.getCreditNotes);

router.delete("/:id",controller.deleteCreditNote);

module.exports=router;