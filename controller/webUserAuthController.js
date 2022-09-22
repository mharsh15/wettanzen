const express = require("express")
const router = express.Router
const passport = require("passport")
const passportKeywords = require("../model/passportKeywordModel")

///render login form
router.get("/login", (req, rep) => {
	rep.render("userSession/login")


})

router.post("/login", passport.authenticate(passportKeywords.login, { failureRedirect: '/login' }), (req, rep) => {
	passport.serializeUser((user, done) => {
		done(null, {
			id: user.id,
			type: user.type
		})
	})
	passport.initialize()
	rep.redirect("userdash")
})

router.get("/userdash", (req, rep) => {
	if (req.isAuthenticated()) {
		return rep.send(req.user``)
	}
	rep.redirect("/login")

})

module.exports = router