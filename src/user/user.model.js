/**
 * User model.
 *
 * @author    Dennis Haulund Nielsen
 * @copyright Copyright (c) 2015, Dennis Haulund Nielsen
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

/**
 * User Schema
 */
var UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true
    },
    last_name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    avatar: {
        type: String,
        default: 'https://raw.githubusercontent.com/martinmicunda/employee-scheduling-ui/master/src/images/anonymous.jpg?123456'
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

/**
 * Pre-save hook (execute before each user.save() call)
 */
UserSchema.pre('save', function(next) {
    var user = this;

    next();
});
/**
 * Transform Response
 */
UserSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret, options) {
        var retJSON = {
            id: ret._id,
            created: ret.created,
            updated: ret.updated,
            first_name: ret.first_name,
            last_name: ret.last_name,
            email: ret.email,
            avatar: ret.avatar
        };
        return retJSON;
    }
});
module.exports = mongoose.model('User', UserSchema);
