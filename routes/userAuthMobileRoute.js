// handles mobile route aka for mobile
const express = require("express")
const passport = require("passport")
const router = express.Router()
const keywords = require("../model/passportKeywordModel")
const controller = require("../controller/mobileUserAuthController")

//sign up a user
router.post("/signup", passport.authenticate(keywords.signup, { session: false }), controller.signUpUser)
//login a user
router.post("/login", passport.authenticate(keywords.login, { session: false }), controller.loginMobileUser)


module.exports = router