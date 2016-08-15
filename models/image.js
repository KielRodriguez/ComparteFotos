var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var img_schema = new Schema({
	title:{
		type:String, 
		require:[true, 'El titulo de la imagen es necesario']
	},
	creator:{type:Schema.ObjectId, ref:"User"}
});

var Image = mongoose.model('Image', img_schema);

module.exports.Image = Image;	