const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const PassportJWTStrategy = require("passport-jwt").Strategy
const ExtractJWTFromPassport = require("passport-jwt").ExtractJwt
const DB = require("../model/userModel")
const bcrypt = require("bcrypt")
const keywords = require("../model/passportKeywordModel")
const catchAsync = require("../error/error")



//using passport to add user usernameField: "email", passwordField: "password"
passport.use(keywords.signup,
	new LocalStrategy({ usernameField: "input[email]", passwordField: "input[password]", passReqToCallback: true },
		async (req, email, password, done) => {
			const { input } = req.body

			try {
				if (input.email && input.password && input.name) {
					const check = await DB.findOne({ email })
					console.log(check)
					if (!check) {
						hashed = await bcrypt.hash(password, 10);
						const user = await DB.create({ email, password: hashed, name: input.name })
						return done(null, user)
					}
					return done("User ID exists")

				}
				return done("form has no input")
			}
			catch (error) {
				done(error)
			}

		}))

//using passport to authorize user
passport.use(keywords.login,
	new LocalStrategy({ usernameField: "input[email]", passwordField: "input[password]" },
		catchAsync(async (email, password, done) => {
			const user = await DB.findOne({ email })
			if (!user) {
				return done(null, false, { message: "User not found" })
			}
			const validPassword = await user.isValidPassword(password)
			if (!validPassword) {
				return done(null, false, { message: "wrong Password" })
			}
			return done(null, user, { message: "Logged In successfully" })

		})

	))

///for jwt strategy, to check and pull data from jwt(userID)
passport.use(new PassportJWTStrategy({
	secretOrKey: 'when_wettanzen_flies',
	jwtFromRequest: ExtractJWTFromPassport.fromUrlQueryParameter('secret_token')
},
	async (token, done) => {
		try {
			return done(null, token.user)

		}
		catch (error) {
			done(error)
		}
	}

))

