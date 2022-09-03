

const DB = require("../model/model").plantTypes
const ReproductionDB = require("../model/model").plantReproductionTypeModel
const GrowthDB = require("../model/model").growthTypeModel

const BASE_ROUTE = require("../model/routeListingModel").plantTypesRoute
const PARTIAL_ROUTE = require("../model/routeListingModel").type
const TOTAL_PARTIAL_ROUTE = BASE_ROUTE + PARTIAL_ROUTE + "/"
const DISEASE_ROUTE = require("../model/routeListingModel").urlsDisease
const KNOW_MORE_ROUTE = require("../model/routeListingModel").urlsKnowMore

//main route where all plants types are displayed
module.exports.getAllPlants = async (req, rep) => {

	const types = await DB.find()
	console.log(types)
	rep.render("plantType/allPlantTypes", { types, route: BASE_ROUTE + "/" })
}

// render individual plant detail
module.exports.getIndividualPlants = async (req, rep) => {
	const { id } = req.params
	const type = await DB.findById(id).populate('reproduction').populate('growth')
	//console.log(type)
	rep.render("plantType/renderIndividualPlantType", { type, route: TOTAL_PARTIAL_ROUTE, diseaseRoute: DISEASE_ROUTE, knowMoreRoute: KNOW_MORE_ROUTE })
}

//render a page to add an individual plant type 
module.exports.renderAddIndividualPlantType = async (req, rep) => {

	const reproductions = await ReproductionDB.find()
	const growths = await GrowthDB.find()
	//console.log(growths)
	rep.render("plantType/addIndividualPlant", { growths, reproductions, route: TOTAL_PARTIAL_ROUTE })

}

//POST request to add an individual plant
module.exports.addIndividualPlantType = async (req, rep) => {
	const { input } = req.body

	if (input.imgurl != "" && input.genus != "" && input.species != "" && input.englishname != "" && input.growth != "" && input.reproduction != "" && input.origin != "" && input.infourls != "" && input.diseaseurls != "" && input.flower != "", input.maxage != "" & input.maxheight != "") {
		input.genus = input.genus.toLowerCase()
		input.species = input.species.toLowerCase()
		const infoURL = { ...input.infourls }
		const diseaseURL = { ...input.diseaseurls }
		input.infourls = [infoURL]
		input.diseaseurls = [diseaseURL]
		const newType = new DB(input)
		console.log(input)
		await newType.save()
		return rep.redirect(BASE_ROUTE)
	}

	rep.redirect(TOTAL_PARTIAL_ROUTE)

}

//renders approproate 
module.exports.renderUpdateIndividualPlantType = async (req, rep) => {
	const { id } = req.params

	const type = await DB.findById(id)
	if (type) {
		const reproductions = await ReproductionDB.find()
		const growths = await GrowthDB.find()
		return rep.render("plantType/updateIndividualPlant", { type, growths, reproductions, route: TOTAL_PARTIAL_ROUTE })
	}

	rep.redirect(BASE_ROUTE)



}

//this handels PUT request to update plant type details
module.exports.updateIndividualPlantType = async (req, rep) => {
	const { id } = req.params
	const { input } = req.body

	if (id != "" && input.imgurl != "" && input.genus != "" && input.species != "" && input.englishname != "" && input.growth != "" && input.reproduction != "" && input.origin != "" && input.infourls != "" && input.diseaseurls != "" && input.flower != "", input.maxage != "" & input.maxheight != "") {
		input.genus = input.genus.toLowerCase()
		input.species = input.species.toLowerCase()
		await DB.findByIdAndUpdate(id, input)
		return rep.redirect(BASE_ROUTE)
	}

	rep.redirect(TOTAL_PARTIAL_ROUTE + "/" + id)



}

//delete plant type
module.exports.deleteIndividualPlant = async (req, rep) => {
	const { id } = req.params
	await DB.findByIdAndDelete(id)
	rep.redirect(BASE_ROUTE)

}