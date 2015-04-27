/**
 * Tag model.
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
 * Tag Schema
 */
var TagSchema = new Schema({
    name: {
        type: String
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
/* TagSchema
    .path('email')
    .validate(function(email) {
        // if you are authenticating by any of the oauth strategies, don't validate
        if (authTypes.indexOf(this.provider) !== -1) return true;
        return email.length;
    }, 'Email cannot be blank');
// Validate email is not taken
TagSchema
    .path('email')
    .validate(function(value, respond) {
        var self = this;
        this.constructor.findOne({email: value}, function(err, tag) {
            if(err) throw err;
            if(tag) {
                if(self.id === tag.id) return respond(true);
                return respond(false);
            }
            respond(true);
        });
    }, 'The specified email address is already in use.');
*/

/**
 * Pre-save hook (execute before each tag.save() call)
 */
TagSchema.pre('save', function(next) {
    var tag = this;

    next();
});

module.exports = mongoose.model('Tag', TagSchema);
