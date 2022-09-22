const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()

const DB = require("../model/model").growthTypeModel
const MAIN_ROUTE_NAME = "/plantgrowthtypes"
const SUB_ROUTE_NAME = "/plantgrowthtypes/type/"

const growthTypeController = require("../controller/growthTypeController")
const catchAsync = require("../error/error")

//middleware
//checks whether it is an admin or not
const isAdmin = require("../middleware/middleware").isAnAdmin
///ALL ROUTES
router
	.get("/", async (req, rep) => {

		var types = await DB.find({})
		rep.render("genericViews/plantList", { types, heading: "Plant Type by Growth", route: "/plantgrowthtypes/type/" })

	})
/////ROUTES for creating and adding a new plant growth
router
	.get("/type", isAdmin, growthTypeController.displayPlantTypeGrowth)
	.post("/type", isAdmin, catchAsync(growthTypeController.createNewPlantTypeGrowthPostRequest))


// Routes dealing with individual plant growth
router.get("/type/:id", isAdmin, catchAsync(growthTypeController.displayIndividualPlantGrowth))
	//update a plant name
	.put("/type/:id", isAdmin, catchAsync(growthTypeController.updateIndividualPlantGrowth))

	//delete a plant name
	.delete("/type/:id", isAdmin, catchAsync(growthTypeController.deleteIndividualPlantGrowth))

module.exports = router