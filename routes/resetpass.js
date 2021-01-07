const express = require("express")
const {validate} = require("express-validation");
const router = express.Router();
const {resetPassword,newPassword} =  require("../handler/resetpass")

router.post("/reset-password",resetPassword);
router.post("/new-password",newPassword);
module.exports = router
