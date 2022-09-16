const mongoose = require("mongoose")
const tableName = require("./modelTableNames")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			require: true,
			unique: true

		},

		name: {
			type: String,
			require: true
		},
		password: {
			type: String,
			require: true
		},
		userType: {
			type: Number,
			require: true,
			default: 0
		}

	})


///for checking validity of passport
UserSchema.methods.isValidPassword = async function (password) {
	const user = this;
	const compare = await bcrypt.compare(password, user.password);

	return compare;
}

const UserModel = mongoose.model(tableName.users, UserSchema)
module.exports = UserModel

