const userTypeModel = require("../model/userTypeModel")


//is logged in to add variable to routes
module.exports.isLoggedIn = (req, rep, next) => {
	rep.locals.isAdmin = false
	if (req.isAuthenticated()) {

		if (req.user.type >= userTypeModel.admin) {
			rep.locals.isAdmin = true
		}
	}

}

//middleware to handle 
module.exports.isAnAdmin = (req, rep, next) => {

	if (req.isAuthenticated()) {
		console.log(req.user)
		if (req.user.type >= userTypeModel.admin.type) {
			return next()
		}
	}
	throw "Un Authorized"


}