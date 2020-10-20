const express = require("express")
const {validate} = require("express-validation");
const router = express.Router();
const {signIn} = require("../handler/signin")
const schema = require("../validations")

router.post("/signin",validate(schema.signinUser, {}, {}),signIn);


module.exports = router