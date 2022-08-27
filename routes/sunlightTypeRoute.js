const router = require("express").Router()
const DB = require("../model/model").sunlightRequiredModel

const controller = require("../controller/sunlightRequirementTypeController")
const BASE_ROUTE = require("../model/routeListingModel").plantGrowthMainRoute
const PARTIAL_ROUTE = require("../model/routeListingModel").type
const TOTAL_PARTIAL_ROUTE = BASE_ROUTE + PARTIAL_ROUTE + "/"
const catchAsync = require("../error/error")

router.get("/", catchAsync(controller.showAllSunlightRequirement))


module.exports = router