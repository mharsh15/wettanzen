const mongoose = require("mongoose")

// importing important models
const staticSchema = require("./staticSchema")
const plantTypeSchema = require("../model/plantTypesModel")
//importing names 
const modelName = require("./modelTableNames")
module.exports = {
	growthTypeModel: mongoose.model(modelName.growthType, staticSchema),
	plantReproductionTypeModel: mongoose.model(modelName.reproductionType, staticSchema),
	sunlightRequiredModel: mongoose.model(modelName.sunlightRequired, staticSchema),
	plantTypes: mongoose.model(modelName.plantTypes, plantTypeSchema)
}