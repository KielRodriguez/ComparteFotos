var express = require('express');
var Image = require('./models/image').Image;
var router = express.Router();

var image_finder_middleware = require('./middlewares/find_image');

router.get('/', function(req, res){
	res.render('app/home')
});

/* REST */

router.get('/imagenes/new', function(req, res){
	console.log('entra a imagenes/new');
	res.render('app/imagenes/new');
});

router.all('/imagenes/:id*', image_finder_middleware);

router.get('/imagenes/:id/edit', function(req, res){
	console.log(res.locals.imagen.creator);
	res.render('app/imagenes/edit');	
});

router.route('/imagenes')
	.post( function(req, res){
		console.log('log post imagenes: ' + res.locals.user._id);
		var data = {
			title: req.body.title,
			creator: res.locals.user._id
		}

		var imagen = new Image(data);

		imagen.save(function(err){
			if(!err){
				res.redirect('/app/imagenes/' + imagen._id);
			}else{
				console.log('Error post imagenes: ' +  err);
				res.render(err);
			}
		});
	})
	.get( function(req, res){
		Image.find({creator:res.locals.user._id}, function(err, imagenes){
			if(err) { res.redirect('/app/'); return;}
			res.render('app/imagenes/index', {imagenes: imagenes } );
		});
	});

router.route('/imagenes/:id')
	.get(function(req, res){
		res.render('app/imagenes/show');			
	}) 
	.put(function(req, res){
		res.locals.imagen.title = req.body.title;
		res.locals.imagen.save().then(function(imagen){
			res.redirect('/app/imagenes/' + req.params.id );
		}, function(err){
			res.render(err);
		});
	})
	.delete(function(req, res){
		Image.findOneAndRemove({_id: req.params.id},function(err){
			if(!err)
				res.redirect('/app/imagenes');
			else{
				res.redirect('/app/imagenes/' +  req.params.id );	
			}
		});
	});

module.exports = router;