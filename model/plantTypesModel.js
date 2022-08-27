//schema for individual plant species with genus and species
const mongoose = require("mongoose")
const tableNames = require("./modelTableNames")
module.exports = new mongoose.Schema({
	genus: {
		type: String,
		required: true,
		unique: true
	},
	species: {
		type: String,
		required: true,
		unique: true
	},
	reproduction: {
		type: mongoose.Schema.ObjectId,
		ref: tableNames.reproductionType,
		require: true
	},
	growth: {
		type: mongoose.Schema.ObjectId,
		ref: tableNames.growthType,
		require: true
	},
	englishname: {
		type: String,
		require: true
	},
	website: {
		type: String
	},
	description: {
		type: String
	}

})