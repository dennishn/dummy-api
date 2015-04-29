/**
 * User routes.
 *
 * @author    Dennis Haulund Nielsen
 * @copyright Copyright (c) 2015, Dennis Haulund Nielsen
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var routeUtils	= require('../utils/route-utils');
var user           = require('./user.controller.js');

/**
 * Set user routes.
 *
 * @param {Object} app The express application
 */
function setUserRoutes(app) {

	/*
	 I have not yet found a way to prepend URI's to routes,
	 so this is the closest we get by still providing a level of
	 configuration
	 */
	var usersRoute = routeUtils.prependRoute('/users');

    app.route(usersRoute + '/:id').get(user.findById);
    app.route(usersRoute + '/:id').put(user.put);
    app.route(usersRoute + '/:id').patch(user.patch);
    app.route(usersRoute + '/:id').delete(user.remove);

	app.route(usersRoute).get(user.findAll);
	app.route(usersRoute).post(user.create);
}

module.exports = setUserRoutes;
