var express = require('express');
var bodyParser = require('body-parser');

var User = require('./models/user').User;

var app = express();


app.use('/estatico', express.static('public'));
app.use(bodyParser.json()); //peticiones con formato application/json
app.use(bodyParser.urlencoded({extended:true})); //obtiene parametros provenientes de la url


app.set('view engine', 'jade');

//Get index
app.get('/', function(req, res){
	res.render('index');
});
//Get login
app.get('/login', function(req, res){
	res.render('login');
});

app.post('/login', function(req, res){

	console.log('Recibimos tus datos');
	console.log('Email: ' + req.body.email );
	console.log('Password ' + req.body.password );
	console.log('Password Confirmation ' + req.body.password_confirmation)
	console.log('redireccionando a index');

	var usr = new User({email:req.body.email, 
						password:req.body.password
					});

	usr.password_confirmation = req.body.password_confirmation;

	usr.validate(function(error){

		if(error){
			console.log(error);
			res.send('Ocurrio un error al procesar la petición');
		}
		else{

			usr.save(function(err){
				res.send("Se inserto la fila correctamente");
			});
		}
	});
	
});

app.listen(3000);