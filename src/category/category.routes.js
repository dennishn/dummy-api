/**
 * Category routes.
 *
 * @author    Dennis Haulund Nielsen
 * @copyright Copyright (c) 2015, Dennis Haulund Nielsen
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var routeUtils	    = require('../utils/route-utils');
var category		= require('./category.controller.js');

/**
 * Set category routes.
 *
 * @param {Object} app The express application
 */
function setCategoryRoutes(app) {

    /*
        I have not yet found a way to prepend URI's to routes,
        so this is the closest we get by still providing a level of
        configuration
     */
	var categoriesRoute = routeUtils.prependRoute('/categories');

    app.route(categoriesRoute + '/:id').delete(category.remove);

    app.route(categoriesRoute).get(category.findAll);
    app.route(categoriesRoute).post(category.create);
}

module.exports = setCategoryRoutes;
