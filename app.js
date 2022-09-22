// Major libraries
require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const ejsMate = require('ejs-mate')

const app = express()
const port = process.env.port || 8080
if (process.env.NODE_ENV !== "production") {
	require('dotenv').config()
}

//for able to parse input forms and ROUTES like POST PUT DELETE
const methodOverride = require("method-override")
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

///importing mongoose - after ENV FILE
const mongooseInit = require("./mongoose/mongooseProd")

//express session and connection to mongo db
const session = require("express-session")
const MongoDBStore = require('connect-mongodb-session')(session);

//kick starting session
const store = new MongoDBStore({
	uri: process.env.MONGOOSE_KEY,
	collection: 'sessions'
});

app.use(require('express-session')({
	secret: process.env.SESSION_KEY,
	cookie: {
		maxAge: 365 * 24 * 60 * 60 * 1000,// 1 year
	},
	store: store,
	resave: true,
	saveUninitialized: false
}));

const passport = require("passport")

//*********MIDDLEWARE */
require("./auth/passportJWTAuth")
//passport flow
app.use(passport.initialize())
app.use(passport.session())


const middlewares = require("./middleware/middleware")


//for front end data passing
const userTypeModel = require("./model/userTypeModel")

app.use((req, rep, next) => {
	rep.locals.isAdmin = false
	rep.locals.isLoggedIn = false
	rep.locals.userEmail = null
	if (req.isAuthenticated()) {
		rep.locals.isLoggedIn = true
		rep.locals.email = req.user.email
		if (req.user.type >= userTypeModel.admin.type) {
			rep.locals.isAdmin = true

		}
	}
	next()
})
//routes static string
const routes = require("./model/routeListingModel")
///importing routes
const growthRoutes = require("./routes/growthTypeRoute")
const reproductionRoutes = require("./routes/reproductionTypeRoute")
const sunlightTypeRoutes = require("./routes/sunlightTypeRoute")
const plantTypesRoute = require("./routes/plantTypesRoute")
const userAuthMobileRoute = require("./routes/userAuthMobileRoute")
const userAuthWebRoute = require("./routes/userAuthWebRoute")

//setting views
//setting ejs
app.set('path', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

//middlewares
app.engine('ejs', ejsMate)

app.get("/", (req, rep) => {
	rep.render("dashboard/dashboard.ejs")

})

///route to edit plant growth types/////////////////////////////////////////////////////
app.use(routes.plantGrowthMainRoute, growthRoutes)
app.use(routes.plantReproductionRoute, reproductionRoutes)
app.use(routes.plantSunlightRequirementRoute, sunlightTypeRoutes)
app.use(routes.plantTypesRoute, plantTypesRoute)
app.use(routes.mobileSession, userAuthMobileRoute)
app.use("/", userAuthWebRoute)
///route to edit plant growth by reproduction type

// app.use((err, req, rep, next) => {
// 	if (err) {
// 		rep.status(404).send(err)
// 	}

// })

// app.get("*", (req, rep) => {
// 	rep.statusCode(400).send("Seems its not page you are looking for")

// })
app.listen(port, () => {
	console.log("Port 3020 up and running")

})