

const DB = require("../model/model").plantTypes
const ReproductionDB = require("../model/model").plantReproductionTypeModel
const GrowthDB = require("../model/model").growthTypeModel

const BASE_ROUTE = require("../model/routeListingModel").plantTypesRoute
const PARTIAL_ROUTE = require("../model/routeListingModel").type
const TOTAL_PARTIAL_ROUTE = BASE_ROUTE + PARTIAL_ROUTE + "/"


//main route where all plants types are displayed
module.exports.getAllPlants = async (req, rep) => {

	const types = await DB.find()
	rep.render("plantType/allPlantTypes", { types, route: TOTAL_PARTIAL_ROUTE })
}

// render individual plant detail
module.exports.getIndividualPlants = async (req, rep) => {
	const { id } = req.params
	const type = await DB.findById(id).populate('reproduction').populate('growth')
	//console.log(type)
	rep.render("plantType/renderIndividualPlantType", { type })
}

//render a page to add an individual plant type 
module.exports.renderAddIndividualPlantType = async (req, rep) => {

	const reproductions = await ReproductionDB.find()
	const growths = await GrowthDB.find()
	console.log(growths)
	rep.render("plantType/addIndividualPlant", { growths, reproductions, route: TOTAL_PARTIAL_ROUTE })

}

//POST request to add an individual plant
module.exports.addIndividualPlantType = async (req, rep) => {
	const { input } = req.body

	if (input.genus != "" && input.species != "" && input.englishName != "" && input.growth != "" && input.reproduction != "") {
		const newType = new DB(input)
		await newType.save()
		return rep.redirect(BASE_ROUTE)
	}

	rep.redirect(TOTAL_PARTIAL_ROUTE)

}