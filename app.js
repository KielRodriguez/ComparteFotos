var express = require('express');

var app = express();
app.set('view engine', 'jade');

//Get index
app.get('/', function(req, res){
	res.render('index');
});
//Get login
app.get('/login', function(req, res){
	res.render('login');
});

app.listen(3000);