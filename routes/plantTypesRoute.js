
// **********************THIS CONTROLLER DEALS WITH HANDELING OF INDIVIDUAL PLANT TYPES WITH GENUS AND SPECIES
const router = require("express").Router()
const catchAsync = require("../error/error")

const BASE_ROUTE = require("../model/routeListingModel").plantTypesRoute
const PARTIAL_ROUTE = require("../model/routeListingModel").type
const TOTAL_PARTIAL_ROUTE = BASE_ROUTE + PARTIAL_ROUTE + "/"
const DISEASE_ROUTE = require("../model/routeListingModel").urlsDisease
const KNOW_MORE_ROUTE = require("../model/routeListingModel").urlsKnowMore

const controller = require("../controller/plantTypesController")

//checks whether it is an admin or not
const isAdmin = require("../middleware/middleware").isAnAdmin

//displays all plant by types - firste and in second it renders individual plant type
router.get("/", catchAsync(controller.getAllPlants))

//renders form to add a new plant type and adds a new plant type
router
	.get(PARTIAL_ROUTE, isAdmin, catchAsync(controller.renderAddIndividualPlantType))
	.get("/:id", controller.getIndividualPlants)
	.post(PARTIAL_ROUTE, isAdmin, catchAsync(controller.addIndividualPlantType))


//handels individual; plant route
router
	.get(PARTIAL_ROUTE + "/:id", isAdmin, catchAsync(controller.renderUpdateIndividualPlantType))
	.put(PARTIAL_ROUTE + "/:id", isAdmin, catchAsync(controller.updateIndividualPlantType))
	.delete(PARTIAL_ROUTE + "/:id", isAdmin, catchAsync(controller.deleteIndividualPlant))

//handels info url route of individual plants
router
	.get(PARTIAL_ROUTE + "/:id" + KNOW_MORE_ROUTE, isAdmin, catchAsync(controller.renderAllKnowMorePlants))
	.post(PARTIAL_ROUTE + "/:id" + KNOW_MORE_ROUTE, isAdmin, catchAsync(controller.addIndividualKnowMorePlants))
	.put(PARTIAL_ROUTE + "/:id" + KNOW_MORE_ROUTE + "/:postID", isAdmin, catchAsync(controller.updateIndividualKnowMorePlants))
	.delete(PARTIAL_ROUTE + "/:id" + KNOW_MORE_ROUTE + "/:postID", isAdmin, catchAsync(controller.deleteIndividualKnowMorePlants))

//handels individual plant routes disease type

module.exports = router