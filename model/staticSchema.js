const mongoose = require("mongoose")
// SCHEMMA for plant growth type, reproduction type and sunlight type
module.exports = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true

	},
	description: {
		type: "string"
	},
	url: { type: "string" }
})