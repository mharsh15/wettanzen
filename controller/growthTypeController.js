
const DB = require("../model/model").growthTypeModel
const MAIN_ROUTE_NAME = "/plantgrowthtypes"
const SUB_ROUTE_NAME = "/plantgrowthtypes/type/"


//all routes 
module.exports.displayPlantTypeGrowth = (req, rep) => {
	rep.render("genericViews/postNewPlantForm", { route: SUB_ROUTE_NAME, header: "Add Plant Growth Type" })
}
//update plant growth
module.exports.createNewPlantTypeGrowthPostRequest = async (req, rep) => {
	const { input } = req.body

	if (input["name"] != "" && input["description"] != "") {
		input["name"] = input["name"].toLowerCase()
		const doc = new DB(input)
		await doc.save();
		rep.redirect(MAIN_ROUTE_NAME)
	}

}
//route dealing with individual plant growth
module.exports.displayIndividualPlantGrowth = async (req, rep) => {

	const { id } = req.params
	const type = await DB.findById(id)
	rep.render("genericViews/putUpdateForm", { type, route: "/plantgrowthtypes/type/" })


}
//update plant growth
module.exports.updateIndividualPlantGrowth = async (req, rep) => {
	const { id } = req.params
	const { input } = req.body
	const check = await DB.findById(id)
	if (check != undefined && input.name != "" && input.description != "") {

		input["name"] = input["name"].toLowerCase()
		//if (input["name"] === check["name"]) { delete input["name"] }

		await DB.findByIdAndUpdate(id, input)
		rep.redirect(MAIN_ROUTE_NAME)
	}
	else {
		rep.send(400)
	}
	//rep.send(input)
}

//delete plant growth
module.exports.deleteIndividualPlantGrowth = async (req, rep) => {
	const { id } = req.params

	await DB.findByIdAndDelete(id)

	rep.redirect(MAIN_ROUTE_NAME)

}

