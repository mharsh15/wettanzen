
const router = require("express").Router()

//routes constant
const BASE_ROUTE = require("../model/routeListingModel").plantReproductionRoute
const PARTIAL_ROUTE = require("../model/routeListingModel").type
const TOTAL_PARTIAL_ROUTE = BASE_ROUTE + "/" + PARTIAL_ROUTE

//handels error
const catchAsync = require("../error/error")
//
const controller = require("../controller/reproductionTypeController")

//checks whether it is an admin or not
const isAdmin = require("../middleware/middleware").isAnAdmin

//routes*****************************************************
router.get("/", catchAsync(controller.displayAllreproductionRoute))

//route to add a new plant type
router
	.get(PARTIAL_ROUTE, isAdmin, controller.displayAddOneReproductionRoute)
	.post(PARTIAL_ROUTE, isAdmin, controller.addOneReproductionRoute)

//route to update reproductuion type of plant from existing list
router.get(PARTIAL_ROUTE + "/:id", isAdmin, catchAsync(controller.displayIndividualReproductionTypeToBeUpdated))
	.put(PARTIAL_ROUTE + "/:id", isAdmin, catchAsync(controller.updateIndividualReproductionType))
	.delete(PARTIAL_ROUTE + "/:id", isAdmin, catchAsync(controller.deleteIndividualReproductionType))

module.exports = router