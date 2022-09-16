const express = require("express")
const passport = require("passport")
const router = express.Router()
const keywords = require("../model/passportKeywordModel")
const controller = require("../controller/mobileUserAuthController")

router.post("/signup", passport.authenticate(keywords.signup, { session: false }), controller.signUpUser)
router.post("/login", passport.authenticate(keywords.login, { session: false }), controller.loginMobileUser)

module.exports = router