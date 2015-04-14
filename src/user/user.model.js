/**
 * User model.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
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

module.exports = mongoose.model('User', UserSchema);
