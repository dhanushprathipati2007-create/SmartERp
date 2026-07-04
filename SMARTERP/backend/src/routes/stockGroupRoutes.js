const express = require("express");

const router = express.Router();

const {

    createStockGroup,

    getStockGroups,

    updateStockGroup,

    deleteStockGroup

} = require("../controllers/stockGroupController");

router.post("/", createStockGroup);

router.get("/", getStockGroups);

router.put("/:id", updateStockGroup);

router.delete("/:id", deleteStockGroup);

module.exports = router;