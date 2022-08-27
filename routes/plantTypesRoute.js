
// **********************THIS CONTROLLER DEALS WITH HANDELING OF INDIVIDUAL PLANT TYPES WITH GENUS AND SPECIES
const router = require("express").Router()
const catchAsync = require("../error/error")

const BASE_ROUTE = require("../model/routeListingModel").plantTypesRoute
const PARTIAL_ROUTE = require("../model/routeListingModel").type
const TOTAL_PARTIAL_ROUTE = BASE_ROUTE + PARTIAL_ROUTE + "/"

const controller = require("../controller/plantTypesController")

//displays all plant by types - firste and in second it renders individual plant type
router.get("/", catchAsync(controller.getAllPlants))
	.get("/:id", controller.getIndividualPlants)


//renders form to add a new plant type and adds a new plant type
router
	.get(PARTIAL_ROUTE, catchAsync(controller.renderAddIndividualPlantType))
	.post(PARTIAL_ROUTE, catchAsync(controller.addIndividualPlantType))

router.get(PARTIAL_ROUTE + "/:id", controller.renderUpdateIndividualPlantType)


module.exports = router