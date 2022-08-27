//database
const DB = require("../model/model").plantReproductionTypeModel

//routes constant
const BASE_ROUTE = require("../model/routeListingModel").plantReproductionRoute
const PARTIAL_ROUTE = require("../model/routeListingModel").type
const TOTAL_PARTIAL_ROUTE = BASE_ROUTE + PARTIAL_ROUTE + "/"

//displays all reproduction types
module.exports.displayAllreproductionRoute = async (req, rep) => {
	const types = await DB.find({})
	rep.render("genericViews/plantList", { types, heading: "Plant Type by Reproduction", route: TOTAL_PARTIAL_ROUTE })

}

//renders page to add a single reproduction type 
module.exports.displayAddOneReproductionRoute = (req, rep) => {
	rep.render("genericViews/postNewPlantForm", { route: TOTAL_PARTIAL_ROUTE, header: "Plant Reproduduction Type" })

}
//adds individual reproduction type to database - POST
module.exports.addOneReproductionRoute = async (req, rep) => {
	const { input } = req.body
	if (input.name != "" && input.description != "") {
		const addData = new DB(input)
		await addData.save()
		rep.redirect(BASE_ROUTE)

	}
	else rep.redirect(PARTIAL_ROUTE)

}

//renders page to update an existing reproduction type
module.exports.displayIndividualReproductionTypeToBeUpdated = async (req, rep) => {
	const { id } = req.params

	if (id != "") {
		const check = await DB.findById(id)

		if (check != undefined) {

			rep.render("genericViews/putUpdateForm", { type: check, route: TOTAL_PARTIAL_ROUTE })
		}
		else {
			rep.send("Some Error Happened")
		}
	}
}

//updates individual reproduction type - POST
module.exports.updateIndividualReproductionType = async (req, rep) => {
	const { id } = req.params
	const { input } = req.body
	if (id != "") {
		const check = await DB.findById(id)

		if (check != undefined && input.name != "" && input.description != "") {

			input["name"] = input["name"].toLowerCase()
			await DB.findByIdAndUpdate(id, input)
			rep.redirect(BASE_ROUTE)
		}
		else {
			rep.redirect(TOTAL_PARTIAL_ROUTE + `/${id}`)
		}
	}

}

//delete route
module.exports.deleteIndividualReproductionType = async (req, rep) => {

	const { id } = req.params
	if (id != "") {
		await DB.findByIdAndDelete(id)
		rep.redirect(BASE_ROUTE)
	}
	else rep.status(400)


}