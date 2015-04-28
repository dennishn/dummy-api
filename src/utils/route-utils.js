/**
 * Utils for routes.
 *
 * @author    Dennis Haulund Nielsen
 * @copyright Copyright (c) 2015, Dennis Haulund Nielsen
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var config		= require('../config/config');

/**
 * Prepend "API" stuff to routes...
 */
function prependRoute(route) {

	return '/' + config.api.prepend + route;

}
exports.prependRoute = prependRoute;
