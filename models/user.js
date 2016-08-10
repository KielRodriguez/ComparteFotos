var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/fotos');

var user_schema = new Schema({
	name: String,
	user_name: String,
	password: String,
	email: String,
	day_of_birthday: Date
});

user_schema.virtual('password_confirmation').get(function(){
	return this.password_confirmation;
}).set(function(password){
	this.password_confirmation = password;
});

var User = mongoose.model("User", user_schema);

module.exports.User = User;
