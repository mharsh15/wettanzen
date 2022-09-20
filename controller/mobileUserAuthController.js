const passport = require("passport")
const jwt = require("jsonwebtoken")
const keywords = require("../model/passportKeywordModel")

//
module.exports.signUpUser = (req, rep) => {
	rep.send({ user: req.user })

}

//route for JWT login for android mobile user
module.exports.loginMobileUser = async (req, rep, next) => {
	passport.authenticate(keywords.login, async (err, user, info) => {
		try {
			if (!user || err) {
				const error = new Error("username related error")
				return next(error)
			}
			req.login(user, { session: false }, async (error) => {
				if (error) return next(error)
				const body = { id: user.id };
				const token = jwt.sign({ user: body }, process.env.JWT_SECRET_KEY);
				return rep.json({ token, name: user.name, email: user.email });
			})


		}
		catch (error) {
			return next(error)
		}

	})(req, rep, next)
}

