/**
 * Category model.
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
 * Category Schema
 */
var CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
/* CategorySchema
    .path('email')
    .validate(function(email) {
        // if you are authenticating by any of the oauth strategies, don't validate
        if (authTypes.indexOf(this.provider) !== -1) return true;
        return email.length;
    }, 'Email cannot be blank');
// Validate email is not taken
CategorySchema
    .path('email')
    .validate(function(value, respond) {
        var self = this;
        this.constructor.findOne({email: value}, function(err, category) {
            if(err) throw err;
            if(category) {
                if(self.id === category.id) return respond(true);
                return respond(false);
            }
            respond(true);
        });
    }, 'The specified email address is already in use.');
*/

/**
 * Pre-save hook (execute before each category.save() call)
 */
CategorySchema.pre('save', function(next) {
    var category = this;

    // Populate likes field if it does not exist
    if(!category.likes) {
        category.likes = 0;
    }

    next();
});

module.exports = mongoose.model('Category', CategorySchema);
