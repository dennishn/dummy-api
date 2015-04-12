"use strict";
var mongoose	= require('mongoose');
var Schema		= mongoose.Schema;

var utils		= require('../utils');

/*
 Schema Definition
 */
var CategorySchema   = new Schema({
	_id: String
});

/*
 Pre Hook Middlewares
 */

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

module.exports = mongoose.model('Category', CategorySchema);