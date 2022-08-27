const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()

const DB = require("../model/model").growthTypeModel
const MAIN_ROUTE_NAME = "/plantgrowthtypes"
const SUB_ROUTE_NAME = "/plantgrowthtypes/type/"

const growthTypeController = require("../controller/growthTypeController")
const catchAsync = require("../error/error")
///ALL ROUTES
router
	.get("/", async (req, rep) => {

		var types = await DB.find({})
		rep.render("genericViews/plantList", { types, heading: "Plant Type by Growth", route: "/plantgrowthtypes/type/" })

	})
/////ROUTES for creating and adding a new plant growth
router
	.get("/type", growthTypeController.displayPlantTypeGrowth)
	.post("/type", catchAsync(growthTypeController.createNewPlantTypeGrowthPostRequest))


// Routes dealing with individual plant growth
router.get("/type/:id", catchAsync(growthTypeController.displayIndividualPlantGrowth))
	//update a plant name
	.put("/type/:id", catchAsync(growthTypeController.updateIndividualPlantGrowth))

	//delete a plant name
	.delete("/type/:id", catchAsync(growthTypeController.deleteIndividualPlantGrowth))

module.exports = router