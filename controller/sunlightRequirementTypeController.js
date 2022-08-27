const DB = require("../model/model").sunlightRequiredModel

const BASE_ROUTE = require("../model/routeListingModel").plantGrowthMainRoute
const PARTIAL_ROUTE = require("../model/routeListingModel").type
const TOTAL_PARTIAL_ROUTE = BASE_ROUTE + PARTIAL_ROUTE + "/"

//displays all sunlight types
module.exports.showAllSunlightRequirement = async (req, rep) => {
	const types = await DB.find()
	rep.render("genericViews/plantList", { types, heading: "Plant Type by Sunlight", route: TOTAL_PARTIAL_ROUTE })

}

