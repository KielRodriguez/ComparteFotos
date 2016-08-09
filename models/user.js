var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/fotos');

var user_schema = {
	name: String,
	user_name: String,
	password: String,
	email: String,
	day_of_birthday: Date
}

var User = mongoose.model("User", user_schema);

module.exports.User = User;
