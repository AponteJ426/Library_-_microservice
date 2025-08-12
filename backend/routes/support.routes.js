const express = require("express");
const router = express.Router();

const {
    createSupport,
    getSupports,
    deleteSupport
} = require("../controllers/support.controller");

router.post("/createSupport", createSupport);
router.get("/getSupports", getSupports);
router.delete("/deleteSupport/:id", deleteSupport);

module.exports = router;
