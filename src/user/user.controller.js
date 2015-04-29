/**
 * User controller.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
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
var loadmore		= require('../nodes/pagination-loadmore');

var User   = require('./user.model.js');

/**
 * Find an user by id.
 *
 * @param {Object} req The request object
 * @param {Object} res The request object
 * @returns {Object} the user corresponding to the specified id
 * @api public
 */
function findById(req, res) {
    User.findById(req.params.id)
		.exec(function (err, user) {
			var error;
			if (err) {
				error = nodesError.wrapError(err);
				return res.status(error.code).send(err);
			} else {
				if(!user) {
					error = nodesError.wrapError({
						name: 'ResourceNotFound'
					});
					return res.status(error.code).send(err);
				}

				var response = responseWrapper.wrapResponse(user);

				res.json(response);
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
	var query = User.find().sort(req.query.sort || 'first_name');

	if(req.query.hasOwnProperty('lastId')) {
		console.log('using loadmore');
		query.loadmore({
			lastId: req.query.lastId || null,
			perPage: req.query.limit || 10
		}, function(err, users) {
			if (err) {
				console.error(err);
				return res.status(400).send(err);
			} else {
				// This data is wrapped in the loadmore module
				res.json(users);
			}
		});
	} else {
		console.log('using paginate');
		query.paginate({
			perPage: req.query.limit || 10,
			delta: req.query.delta || 3,
			page: req.query.page || 1
		}, function(err, users) {
			if (err) {
				console.error(err);
				return res.status(400).send(err);
			} else {
				// This data is wrapped in the paginator module
				return res.json(users);
			}
		});
	}
}

/**
 * Create a user.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Object} the created user
 * @api public
 */
function create(req, res) {

	var user = new User(req.body);

	user.save(function(err, user) {
		if (err) {
			var error = nodesError.wrapError(err);
			return res.status(error.code).send(err);
		} else {
			var response = responseWrapper.wrapResponse(user);

			res.json(response);
		}
	});
}

/**
 * Updates all columns of a user.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Object} the updated user
 * @api public
 */
function put(req, res) {

	User.findById(req.params.id)
		.exec(function(err, user) {
			if (err) {
				var error = nodesError.wrapError(err);
				return res.status(error.code).send(err);
			} else {

				modelUtils.updateDocument(user, User, req.body);

				user.updated = Date.now();

				user.save(function(err, user) {

					if (err) {
						var error = nodesError.wrapError(err);
						return res.status(error.code).send(err);
					} else {
						var response = responseWrapper.wrapResponse(user);

						res.json(response);
					}

				});
			}
		});

}

/**
 * Update one or more columns of a user.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Object} the updated user
 * @api public
 */
// Fake Patch, atleast for now. How does PHP validate that the
// data transferred in a put is a full object? And how do they
// validate that a patch only contains "some" columns - not all...?
function patch(req, res) {

	User.findById(req.params.id)
		.exec(function(err, user) {
			if (err) {
				var error = nodesError.wrapError(err);
				return res.status(error.code).send(err);
			} else {

				modelUtils.updateDocument(user, User, req.body);

				user.updated = Date.now();

				user.save(function(err, user) {

					if (err) {
						var error = nodesError.wrapError(err);
						return res.status(error.code).send(err);
					} else {
						var response = responseWrapper.wrapResponse(user);

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

	User.findById(req.params.id)
		.exec(function(err, user) {
			if (err) {
				var error = nodesError.wrapError(err);
				return res.status(error.code).send(err);
			} else {

				user.remove(function(err) {

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

module.exports = {
    findById: findById,
    findAll: findAll,
	create: create,
	put: put,
	patch: patch,
	remove: remove
};
