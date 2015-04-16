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
        type: Number
    },
    //category: {
    //    type: Schema.Types.ObjectId,
    //    ref: 'Category'
    //},
    //tags: [{
    //    type: String
    //}],
    //comments: [{
    //    type: Schema.Types.ObjectId,
    //    ref: 'Comment'
    //}],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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

module.exports = mongoose.model('Post', PostSchema);
