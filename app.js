var express = require('express');
var bodyParser = require('body-parser');
//var session = require('express-session');
var cookieSession = require('cookie-session');
var routersApp = require('./routers_app');
var session_middleware = require('./middlewares/session');
var methodOverride = require('method-override');


var User = require('./models/user').User;
var app = express();
/*
var sess = {
	secret: 'comparte-fotors_18273hat1',
	cookie:{}
}
*/

var sess ={
	name:'session',
	keys:['key1', 'key2']
}


app.use(methodOverride('_method'));
app.use('/estatico', express.static('public'));
app.use( cookieSession(sess) );
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
	console.log('Email: ' + req.body.email );
	console.log('Nombre de usuario: ' + req.body.username);
	console.log('Password ' + req.body.password );
	console.log('Password Confirmation ' + req.body.password_confirmation)

	var usr = new User({
						email:req.body.email,
						username: req.body.username,
						password:req.body.password
					});

	//Esto es necesario meterlo en un try catch
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

app.post('/session', function(req, res, next){
	console.log('Email: ' + req.body.email );
	console.log('Password: ' + req.body.password );

	User.findOne({email: req.body.email, password: req.body.password}, function(error, user){
		console.log('find user for session')
		console.log(user)
		console.log(user._id);
		req.session.user_id = user._id;
		req.session.save();
		console.log('user_id: ' + req.session.user_id);
		console.log('======================');
		res.redirect('/app/');
	});

	

	
});

app.use('/app', session_middleware);
app.use('/app', routersApp);

app.listen(3000);