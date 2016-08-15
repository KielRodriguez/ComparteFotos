var User = require('../models/user').User;

module.exports = function(req, res, next){

	sess = req.session;
	console.log('middleware session');
	console.log('Session: ' + sess)
	console.log('User_id: ' + sess.user_id);

	if(!sess.user_id){
		res.redirect('/singin');
	}else{
		console.log('entra a el en session 1');
		User.findById(sess.user_id, function(error, user){
			if(error){
				console.log(error);
				res.redirect('/singin');
			}
			else{
				res.locals ={user:user}
				console.log('usuario: ' + res.locals.user);
				next();
			}
			
		});
		
	}
}