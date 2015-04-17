/**
 * Post routes.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var post           = require('./post.controller.js');

/**
 * Set post routes.
 *
 * @param {Object} app The express application
 */
function setPostRoutes(app) {
    app.route('/posts/:id').get(post.findById);
    app.route('/posts').get(post.findAll);
    app.route('/posts').post(post.create);
}

module.exports = setPostRoutes;
