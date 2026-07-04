const express = require("express");

const router = express.Router();

const {

    createStockItem,

    getStockItems,

    updateStockItem,

    deleteStockItem,

    searchStockItems

} = require("../controllers/stockItemController");

/*
========================================
Create Stock Item
========================================
*/
router.post("/", createStockItem);

/*
========================================
Get All Stock Items
========================================
*/
router.get("/", getStockItems);

/*
========================================
Search Stock Items
========================================
*/
router.get("/search/:keyword", searchStockItems);

/*
========================================
Update Stock Item
========================================
*/
router.put("/:id", updateStockItem);

/*
========================================
Delete Stock Item
========================================
*/
router.delete("/:id", deleteStockItem);

module.exports = router;