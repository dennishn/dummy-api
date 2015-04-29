/**
 * Post routes.
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
var post		= require('./post.controller.js');

/**
 * Set post routes.
 *
 * @param {Object} app The express application
 */
function setPostRoutes(app) {

    /*
        I have not yet found a way to prepend URI's to routes,
        so this is the closest we get by still providing a level of
        configuration
     */
	var postsRoute = routeUtils.prependRoute('/posts');

    app.route(postsRoute + '/:id/like').post(post.like);
    app.route(postsRoute + '/:id/like').delete(post.dislike);

    app.route(postsRoute + '/:id').get(post.findById);
    app.route(postsRoute + '/:id').put(post.put);
    app.route(postsRoute + '/:id').patch(post.patch);
    app.route(postsRoute + '/:id').delete(post.remove);

    app.route(postsRoute).get(post.findAll);
    app.route(postsRoute).post(post.create);
}

module.exports = setPostRoutes;
