/**
 * Post controller.
 *
 * @author    Dennis Haulund Nielsen
 * @copyright Copyright (c) 2015, Dennis Haulund Nielsen
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var nodesError      = require('../nodes/error');
var modelUtils		= require('../utils/model-utils');

var Post            = require('./post.model.js');

/**
 * Find a post by id.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Object} the post corresponding to the specified id
 * @api public
 */
function findById(req, res) {
    return Post.findById(req.params.id, function (err, post) {
		var error;
        if (err) {
			error = nodesError.wrapError(err);
			return res.status(error.code).send(err);
        } else {
			if(!post) {
				error = nodesError.wrapError({
					name: 'ResourceNotFound'
				});
				return res.status(error.code).send(err);
			}
            res.json(post);
        }
    });
}

/**
 * List of posts.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Array} the list of posts
 * @api public
 */
function findAll(req, res) {

	var categoryQuery,
		authorQuery,
		tagQuery;

	// Query Parameters
	if(req.query.categories) {
		categoryQuery = _buildQueryObject('category', req.query.categories);
	}

    Post.find()
		.or(categoryQuery)
        .populate('author')
		.populate('category')
        .exec(function(err, posts) {
            if (err) {
                console.error(err);
                return res.status(400).send(err);
            } else {
                res.json(posts);
            }
        });
}

/**
 * Create a post.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Object} the created post
 * @api public
 */
function create(req, res) {

    var post = new Post(req.body);

    post.save(function(err, post) {
        if (err) {
            var error = nodesError.wrapError(err);
            return res.status(error.code).send(err);
        } else {
            res.json(post);
        }
    });
}

/**
 * Updates all columns of a post.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Object} the updated post
 * @api public
 */
function put(req, res) {

	Post.findById(req.params.id)
		.exec(function(err, post) {
			if (err) {
				var error = nodesError.wrapError(err);
				return res.status(error.code).send(err);
			} else {

				modelUtils.updateDocument(post, Post, req.body);

				post.save(function(err, post) {

					if (err) {
						var error = nodesError.wrapError(err);
						return res.status(error.code).send(err);
					} else {
						res.json(post);
					}

				});
			}
		});

}

/**
 * Update one or more columns of a post.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Object} the updated post
 * @api public
 */
// Fake Patch, atleast for now. How does PHP validate that the
// data transferred in a put is a full object? And how do they
// validate that a patch only contains "some" columns - not all...?
function patch(req, res) {

	Post.findById(req.params.id)
		.exec(function(err, post) {
			if (err) {
				var error = nodesError.wrapError(err);
				return res.status(error.code).send(err);
			} else {

				modelUtils.updateDocument(post, Post, req.body);

				post.save(function(err, post) {

					if (err) {
						var error = nodesError.wrapError(err);
						return res.status(error.code).send(err);
					} else {
						res.json(post);
					}

				});
			}
		});

}

/**
 * Remove a post.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {String} an empty string
 * @api public
 */
function remove(req, res) {

	Post.findById(req.params.id)
		.exec(function(err, post) {
			if (err) {
				var error = nodesError.wrapError(err);
				return res.status(error.code).send(err);
			} else {

				post.remove(function(err) {

					if (err) {
						var error = nodesError.wrapError(err);
						return res.status(error.code).send(err);
					} else {
						res.send('');
					}

				});

			}
		});

}

/*
	Private Methods
 */
function _buildQueryObject(field, queryString) {

	var queries = queryString.replace(/ /g,'').split(',');

	console.log(queries, queryString)

	var q = {};
	//q[field] = queryString.replace(/ /g,'');
	q[field] = queryString;
	console.log(q);
	return  q;
}

module.exports = {
    findById: findById,
    findAll: findAll,
    create: create,
	put: put,
	patch: patch,
	remove: remove
};
