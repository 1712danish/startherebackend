const express = require("express")
const {getMssgList,getMssgs} =require("../handler/getmessage")
const router = express.Router();


router.get("/mssginfo",getMssgList)
router.get("/messages",getMssgs)

module.exports = router