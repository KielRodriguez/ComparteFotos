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
	return this.password;
}).set(function(password){
	console.log('virtual password ' + password );
	console.log('virtual password form ' + this.password );
	if( this.password != password)
		throw new Error('Confirmación y contraseña son diferentes');
});

var User = mongoose.model("User", user_schema);

module.exports.User = User;
