const express=require("express");

const router=express.Router();

const controller=require("../controllers/contraController");

router.post("/",controller.createContra);

router.get("/",controller.getContras);

module.exports=router;