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
var nodesError      = require('../nodes/error');
var Post            = require('./post.model.js');

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
            console.error(err.message);
            return res.status(400).send(err);
        } else {
            res.json(post);
        }
    });
}

/**
 * List of posts.
 *
 * @param {Object} req The request object
 * @param {Object} res The request object
 * @returns {Array} the list of posts
 * @api public
 */
function findAll(req, res) {
    Post.find()
        .populate('author')
        .exec(function(err, posts) {
            if (err) {
                console.error(err.message);
                return res.status(400).send(err);
            } else {
                res.json(posts);
            }
        });
}

function create(req, res) {
    /*
        Validate:
        Must have author (So uhm, 412 precondition failed...)
     */

    var post = new Post(req.body);

    post.save(function(err, post) {
        if (err) {
            var error = nodesError.wrapError(err);
            console.log(error)
            return res.status(error.code).send(err);
        } else {
            res.json(post);
        }
    });
}

function update(req, res) {

}

function put(req, res) {

}

function remove(req, res) {

}

module.exports = {
    findById: findById,
    findAll: findAll,
    create: create
};
