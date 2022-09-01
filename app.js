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

///importing mongoose - after ENV FILE
const mongooseInit = require("./mongoose/mongooseProd")

//routes static string
const routes = require("./model/routeListingModel")
///importing routes
const growthRoutes = require("./routes/growthTypeRoute")
const reproductionRoutes = require("./routes/reproductionTypeRoute")
const sunlightTypeRoutes = require("./routes/sunlightTypeRoute")
const plantTypesRoute = require("./routes/plantTypesRoute")


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
///route to edit plant growth by reproduction type

app.use((err, req, rep, next) => {
	if (err) {
		rep.statusCode(404).send(err)
	}

})

app.get("*", (req, rep) => {
	rep.sendStatus(400).send("Seems its not page you are looking for")

})
app.listen(port, () => {
	console.log("Port 3020 up and running")

})