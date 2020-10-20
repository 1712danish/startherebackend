const express = require("express")
// const {validate} = require("express-validation");
const {validateAuth} =require("../middlewares/auth")
const {Profile,showProfile} = require("../handler/profile");
const {userPost,getPost} = require("../handler/userPost")
const { route } = require("./signup");
const router = express.Router();

router.put("/profile",validateAuth,Profile)
router.get("/showprofile",validateAuth,showProfile)
router.post("/userpost",validateAuth,userPost)
router.get("/getpost",validateAuth,getPost)

module.exports = router