/**
 * Category model.
 *
 * @author    Dennis Haulund Nielsen
 * @copyright Copyright (c) 2015, Dennis Haulund Nielsen
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

    next();
});

/**
 * Transform Response
 */
CategorySchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret, options) {
        var retJSON = {
            created: ret.created,
            updated: ret.updated,
            id: ret._id,
            name: ret.name
        };
        return retJSON;
    }
});

module.exports = mongoose.model('Category', CategorySchema);
