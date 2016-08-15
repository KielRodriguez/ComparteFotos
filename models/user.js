var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/fotos');

var posibles_valores = ['M', 'F'];
var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, 'El formato del emil no es correcto'];

var user_schema = new Schema({
	username: {
		type:String, 
		required:[true, 'username es obligatorio'], 
		maxlength:[50, 'username sobrepasa el limite de caracteres (limite 50)']
	},
	password: {	
		type:String, 
		required: [true,'El daato contraseña es obligatorio'],
		minglength:[8, 'La contraseña es muy corta']
	},
	email: {
		type:String, 
		required:[true,'El correo es obligatorio'],
		match: email_match
	}

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
