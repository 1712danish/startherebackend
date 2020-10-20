const express = require("express")
// const {validate} = require("express-validation");
const {validateAuth} =require("../middlewares/auth")
const {consultantList} = require("../handler/consultantList")
const router = express.Router();

router.get("/consultantlist",validateAuth,consultantList)

module.exports = router