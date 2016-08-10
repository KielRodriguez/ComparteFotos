var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/fotos');

var posibles_valores = ['M', 'F'];
var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, 'El formato del emil no es correcto'];

var user_schema = new Schema({
	name: {
		type:String, 
		required:[true, 'Es obligatorio el campo nombre'], 
		maxlength:[200, 'El nombre excede el limite de caracteres (limite 200)']
	},
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
	},
	age:{
		type:Number,
		required:[true, 'el campo edad es obligatorio'], 
		max:[4, 'La edad no puede ser menor que 4'], 
		max:[100, 'La edad es superior a la permitidad (maximo 100)']
	},
	day_of_birthday: Date,
	sex:{
		type:String,	
		required:[true, 'El campo sexo es obligatorio'],	
		enum:{
			values:posibles_valores,
			message:'Opción seleccionada no es permitidad (Opaciones: F, M)'
		}
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
