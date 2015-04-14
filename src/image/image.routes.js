/**
 * Image routes.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var image          = require('./image.controller.js');

/**
 * Set image routes.
 *
 * @param {Object} app The express application
 */
function setImageRoutes(app) {
    app.route('/images')
        .post(image.create)
        .get(image.findByUser);

    app.route('/images/:id').delete(image.delete);

}

module.exports = setImageRoutes;
