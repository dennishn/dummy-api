var mongoose	= require('mongoose');
var Schema		= mongoose.Schema;

var Comment		= require('./comment');

var PostSchema   = new Schema({
	title: String,
	comments: [Comment.schema]
});

module.exports = mongoose.model('Post', PostSchema);