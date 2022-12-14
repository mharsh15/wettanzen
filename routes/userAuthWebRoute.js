const express = require("express")
const router = express.Router()
const passport = require("passport")
const passportKeywords = require("../model/passportKeywordModel")

///render login form
router.get("/login", (req, rep) => {
	rep.render("userSession/login")


})

router.post("/web/login", passport.authenticate(passportKeywords.login, { failureRedirect: '/login' }), (req, rep) => {
	passport.initialize()
	passport.session()
	console.log(req.session)

	rep.redirect("/userdash")
})

router.get("/userdash", (req, rep) => {

	console.log(req.user)

	if (req.isAuthenticated()) {
		return rep.send(req.user)
	}
	rep.redirect("/login")

})

module.exports = router