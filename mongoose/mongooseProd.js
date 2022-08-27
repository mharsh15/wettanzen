const mongoose = require("mongoose")

module.exports = mongoose.connect(process.env.MONGOOSE_KEY,
	{ useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Connected to MongoDB mongoDB Prod")
	})
	.catch(error => {
		console.log("Error connecting to mongoDB Prod")
		console.log(error);

	})