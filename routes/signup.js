const express = require("express");
const {validate} = require("express-validation");
const router = express.Router();
const {signup} = require("../handler/signup");
const schema = require("../validations")

router.post("/signup",validate(schema.registerUser, {}, {}),signup);


module.exports = router