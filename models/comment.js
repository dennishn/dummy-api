var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Post		= require('./post');

/*
 	Schema Definition
 */
var CommentSchema   = new Schema({
	body: String,
	post: {
		type: Schema.Types.ObjectId,
		ref: 'Post'
	}
});

/*
 	Pre Hook Middlewares
 */
CommentSchema.pre('remove', function(next) {

	var comment = this;

	// When a Comment is removed, we remove it's associated representation in
	// the Post model
	Post.findByIdAndUpdate(this.post, {
		$pull: {
			comments: comment._id
		}
	}, function(err) {
		if(err) { return next(err); }
		next();
	});

});

/*
 	Post Hook Middlewares
 */

/*
 	Validator Middlewares
 */

/*
 	Static Methods
 */

/*
 	Methods
 */

module.exports = mongoose.model('Comment', CommentSchema);