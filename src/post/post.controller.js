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
var mongoose		= require('mongoose');

var modelUtils		= require('../utils/model-utils');

var nodesError      = require('../nodes/error');
var responseWrapper	= require('../nodes/response-wrapper');
var paginator		= require('../nodes/pagination-pages');

var Post            = require('./post.model.js');
var User			= require('../user/user.model.js');
var Category		= require('../category/category.model.js');

/**
 * Find a post by id.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Object} the post corresponding to the specified id
 * @api public
 */
function findById(req, res) {
    Post.findById(req.params.id)
		.populate('author')
		.populate('category')
		.exec(function (err, post) {
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

				var response = responseWrapper.wrapResponse(post);

				res.json(response);
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

	var query = Post.find().populate('author').populate('category');

	query.paginate({
		perPage: req.query.limit || 10,
		delta: req.query.delta || 3,
		page: req.query.page || 1
	}, function(err, posts) {
		if (err) {
			console.error(err);
			return res.status(400).send(err);
		} else {
			// This data is wrapped in the paginator module
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

	// Make sure the user exists, and update post.author accordingly.
	User.findById(post.author).exec(function(user) {
		post.author = user;
	});

	// Make sure the category exists, and update post.category accordingly.
	Category.findById(post.category).exec(function(category) {
		post.category = category;
	});

    post.save(function(err, post) {
        if (err) {
            var error = nodesError.wrapError(err);
            return res.status(error.code).send(err);
        } else {
			var response = responseWrapper.wrapResponse(post);

			res.json(response);
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

				post.updated = Date.now();

				post.save(function(err, post) {

					if (err) {
						var error = nodesError.wrapError(err);
						return res.status(error.code).send(err);
					} else {
						var response = responseWrapper.wrapResponse(post);

						res.json(response);
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

				post.updated = Date.now();

				post.save(function(err, post) {

					if (err) {
						var error = nodesError.wrapError(err);
						return res.status(error.code).send(err);
					} else {
						var response = responseWrapper.wrapResponse(post);

						res.json(response);
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

						var response = responseWrapper.wrapResponse('');

						res.json(response);

					}

				});

			}
		});

}

function like(req, res) {

	Post.findById(req.params.id)
		.exec(function(err, post) {
			if (err) {
				var error = nodesError.wrapError(err);
				return res.status(error.code).send(err);
			} else {

				post.likes++;

				post.save(function(err, post) {

					if (err) {
						var error = nodesError.wrapError(err);
						return res.status(error.code).send(err);
					} else {
						var response = responseWrapper.wrapResponse(post);

						res.json(response);
					}

				});
			}
		});

}
function dislike(req, res) {

	Post.findById(req.params.id)
		.exec(function(err, post) {
			if (err) {
				var error = nodesError.wrapError(err);
				return res.status(error.code).send(err);
			} else {

				if(post.likes > 0) {
					post.likes--;
				}

				post.save(function(err, post) {

					if (err) {
						var error = nodesError.wrapError(err);
						return res.status(error.code).send(err);
					} else {
						var response = responseWrapper.wrapResponse(post);

						res.json(response);
					}

				});
			}
		});

}

module.exports = {
    findById: findById,
    findAll: findAll,
    create: create,
	put: put,
	patch: patch,
	remove: remove,
	like: like,
	dislike: dislike
};
