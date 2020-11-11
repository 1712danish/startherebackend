const express = require("express")
const {validate} = require("express-validation");
const router = express.Router();
const {chat} = require("../handler/chat")
// const schema = require("../validations")

router.post("/chat",chat);


module.exports = router