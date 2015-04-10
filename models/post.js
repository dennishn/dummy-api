var mongoose	= require('mongoose');
var Schema		= mongoose.Schema;

var Comment		= require('./comment');

/*
	Schema Definition
 */
var PostSchema   = new Schema({
	title: {
		type: String,
		required: true
	},
	body: {
		type: String
	},
	created: {
		type: Date,
		default: Date.now
	},
	modified: {
		type: Date,
		default: Date.now
	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}]
});

/*
	Pre Hook Middlewares
 */
PostSchema.pre('remove', function(next) {

	// When a Post is removed, we remove all the associated comments
	Comment.remove({post: this._id}).exec();

	next();

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
PostSchema.statics = {

};

/*
	Methods
 */

module.exports = mongoose.model('Post', PostSchema);