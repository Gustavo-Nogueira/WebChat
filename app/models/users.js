const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	nickname: {
		type: String,
		required: true,
	},
	userSocketId: {
		type: String,
		required: true,
	}
});

const User = mongoose.model("User",UserSchema);
module.exports = () => User; 
/*
module.exports.user = function() {
	return User;
}
*/