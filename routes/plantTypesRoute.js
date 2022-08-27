const router = require("express").Router()
const catchAsync = require("../error/error")

const BASE_ROUTE = require("../model/routeListingModel").plantTypesRoute
const PARTIAL_ROUTE = require("../model/routeListingModel").type
const TOTAL_PARTIAL_ROUTE = BASE_ROUTE + PARTIAL_ROUTE + "/"

const controller = require("../controller/plantTypesController")

//displays all plant by types
router.get("/", catchAsync(controller.getAllPlants))


router
	.get(PARTIAL_ROUTE, catchAsync(controller.renderAddIndividualPlantType))
	.post(PARTIAL_ROUTE, catchAsync(controller.addIndividualPlantType))

router.get(PARTIAL_ROUTE + "/:id", controller.getIndividualPlants)


module.exports = router