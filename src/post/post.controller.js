/**
 * Post controller.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var logger = require('mm-node-logger')(module);
var Post   = require('./post.model.js');

/**
 * Find an post by id.
 *
 * @param {Object} req The request object
 * @param {Object} res The request object
 * @returns {Object} the post corresponding to the specified id
 * @api public
 */
function findById(req, res) {
    return Post.findById(req.params.id, 'title body', function (err, post) {
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            res.json(post);
        }
    });
}

/**
 * List of users.
 *
 * @param {Object} req The request object
 * @param {Object} res The request object
 * @returns {Array} the list of users
 * @api public
 */
function findAll(req, res) {
    Post.find(function(err, users) {
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            res.json(users);
        }
    });
}

module.exports = {
    findById: findById,
    findAll: findAll
};
