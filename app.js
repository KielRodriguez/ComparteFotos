var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');


var User = require('./models/user').User;
var app = express();
var sess;


app.use('/estatico', express.static('public'));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', key: 'sid', cookie: { secure: true }}));
app.use(bodyParser.json()); //peticiones con formato application/json
app.use(bodyParser.urlencoded({extended:true})); //obtiene parametros provenientes de la url


app.set('view engine', 'jade');

//Get index
app.get('/', function(req, res){
	sess = req.session;

	console.log('Session: ' + sess)
	console.log('User_id: ' + sess.user_id);
	res.render('index');
});
//Get login
app.get('/singup', function(req, res){
	res.render('singup');
});

app.post('/singup', function(req, res){


	console.log('Recibimos tus datos');
	console.log('Nombre: ' +  req.body.name);
	console.log('Email: ' + req.body.email );
	console.log('Nombre de usuario: ' + req.body.username);
	console.log('Password ' + req.body.password );
	console.log('Password Confirmation ' + req.body.password_confirmation)
	console.log('Edad ' + req.body.age);
	console.log('Sexo ' + req.body.sex);

	var usr = new User({
						name: req.body.name,
						email:req.body.email,
						username: req.body.username,
						password:req.body.password,
						age: req.body.age,
						day_of_birthday: req.body.day_of_birthday, 
						sex: req.body.sex
						
					});

	usr.password_confirmation = req.body.password_confirmation;

	usr.save().then(function(usr){
		res.send('Se almaceno al usuario correctamente');
	}, function(err){
		console.log(err);
		res.send('No fue posible almacenar la informacion de usuario');
	});
	
});

app.get('/singin', function(req, res){

	res.render('singin');
});

app.post('/session', function(req, res){

	sess = req.session
	console.log('Email: ' + req.body.email );
	console.log('Password: ' + req.body.password );

	User.findOne({email: req.body.email, password: req.body.password}, function(error, user){
		console.log('find user for session')
		console.log(user)
		console.log(user._id);
		sess.user_id = user._id;
		console.log('user_id: ' + sess.user_id);
		console.log('======================');
	});

	

	res.send('Hola mundo');
});

app.listen(3000);