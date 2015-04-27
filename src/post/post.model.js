/**
 * Post model.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose    = require('mongoose');
var Schema		= mongoose.Schema;

var modelUtils  = require('../utils/model-utils');

/**
 * Post Schema
 */
var PostSchema = new Schema({
    cover_image: {
        type: String
    },
    title: {
        type: String,
        trim: true
    },
	body: {
		type: String,
		trim: true
	},
    likes: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    tags: [{
        type: String
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'Author is required'
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    }
});

/**
 * Validations
 */
// Validate empty email
/* PostSchema
    .path('email')
    .validate(function(email) {
        // if you are authenticating by any of the oauth strategies, don't validate
        if (authTypes.indexOf(this.provider) !== -1) return true;
        return email.length;
    }, 'Email cannot be blank');
// Validate email is not taken
PostSchema
    .path('email')
    .validate(function(value, respond) {
        var self = this;
        this.constructor.findOne({email: value}, function(err, post) {
            if(err) throw err;
            if(post) {
                if(self.id === post.id) return respond(true);
                return respond(false);
            }
            respond(true);
        });
    }, 'The specified email address is already in use.');
*/

/**
 * Pre-save hook (execute before each post.save() call)
 */
PostSchema.pre('save', function(next) {
    var post = this;

    next();
});

PostSchema.methods.like = function (cb) {
    return this.model('Animal').find({ type: this.type }, cb);
};

/**
 * Transform Response
 */
PostSchema.set('toJSON', {
	virtuals: true,
	transform: function(doc, ret, options) {
		var retJSON = {
			created: ret.created,
			updated: ret.updated,
			id: ret._id,
			cover_image: ret.cover_image,
			title: ret.title,
			body: ret.body,
			likes: ret.likes,
			category: ret.category,
			tags: ret.tags,
			author: ret.author
		};
		return retJSON;
	}
});

module.exports = mongoose.model('Post', PostSchema);
