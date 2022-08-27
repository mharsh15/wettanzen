
const router = require("express").Router()

//routes constant
const BASE_ROUTE = require("../model/routeListingModel").plantReproductionRoute
const PARTIAL_ROUTE = require("../model/routeListingModel").type
const TOTAL_PARTIAL_ROUTE = BASE_ROUTE + "/" + PARTIAL_ROUTE

//handels error
const catchAsync = require("../error/error")
//
const controller = require("../controller/reproductionTypeController")
//routes
router.get("/", catchAsync(controller.displayAllreproductionRoute))

//route to add a new plant type
router
	.get(PARTIAL_ROUTE, controller.displayAddOneReproductionRoute)
	.post(PARTIAL_ROUTE, controller.addOneReproductionRoute)

//route to update reproductuion type of plant from existing list
router.get(PARTIAL_ROUTE + "/:id", catchAsync(controller.displayIndividualReproductionTypeToBeUpdated))
	.put(PARTIAL_ROUTE + "/:id", catchAsync(controller.updateIndividualReproductionType))
	.delete(PARTIAL_ROUTE + "/:id", catchAsync(controller.deleteIndividualReproductionType))

module.exports = router