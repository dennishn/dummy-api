var mongoose	= require('mongoose');
var Schema		= mongoose.Schema;
var utils		= require('../utils');

var Comment		= require('./comment');
var Category	= require('./category');

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
	categories: [{
		type: String
	}],
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}],
	_slug: {
		type: String
	},
	_normalizedTitle: {
		type: String
	}
});

/*
	Pre Hook Middlewares
 */
PostSchema.pre('save', function(next) {

	// When a Post is saved, we fill out the slug and normalized fields automatically
	this._slug = utils.slugify(this.title);
	this._normalizedTitle = this.title.toLowerCase();

	next();

});
PostSchema.pre('remove', function(next) {

	// When a Post is removed, we remove all the associated comments
	if(this.comments.length > 0) {
		Comment.remove({post: this._id}).exec();
	}

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