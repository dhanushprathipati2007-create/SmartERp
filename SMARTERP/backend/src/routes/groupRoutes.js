const express = require("express");

const router = express.Router();

const {

    createGroup,

    getGroups,

    updateGroup,

    deleteGroup,

    searchGroup

} = require("../controllers/groupController");

router.post("/", createGroup);

router.get("/", getGroups);

router.put("/:id", updateGroup);

router.delete("/:id", deleteGroup);

router.get("/search/:keyword", searchGroup);

module.exports = router;