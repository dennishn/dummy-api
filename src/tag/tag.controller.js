/**
 * Category controller.
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

var Category            = require('./tag.model.js');

/**
 * Find a category by id.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Object} the category corresponding to the specified id
 * @api public
 */
function findById(req, res) {
    return Category.findById(req.params.id, function (err, category) {
		var error;
        if (err) {
			error = nodesError.wrapError(err);
			return res.status(error.code).send(err);
        } else {
			if(!category) {
				error = nodesError.wrapError({
					name: 'ResourceNotFound'
				});
				return res.status(error.code).send(err);
			}
            res.json(category);
        }
    });
}

/**
 * List of categories.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Array} the list of categories
 * @api public
 */
function findAll(req, res) {
	console.log(req.params);
    Category.find()
        .populate('author')
        .exec(function(err, categories) {
            if (err) {
                console.error(err.message);
                return res.status(400).send(err);
            } else {
                res.json(categories);
            }
        });
}

/**
 * Create a category.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Object} the created category
 * @api public
 */
function create(req, res) {

    var category = new Category(req.body);

    category.save(function(err, category) {
        if (err) {
            var error = nodesError.wrapError(err);
            return res.status(error.code).send(err);
        } else {
            res.json(category);
        }
    });
}

/**
 * Updates all columns of a category.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Object} the updated category
 * @api public
 */
function put(req, res) {

	Category.findById(req.params.id)
		.exec(function(err, category) {
			if (err) {
				var error = nodesError.wrapError(err);
				return res.status(error.code).send(err);
			} else {

				modelUtils.updateDocument(category, Category, req.body);

				category.save(function(err, category) {

					if (err) {
						var error = nodesError.wrapError(err);
						return res.status(error.code).send(err);
					} else {
						res.json(category);
					}

				});
			}
		});

}

/**
 * Update one or more columns of a category.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Object} the updated category
 * @api public
 */
// Fake Patch, atleast for now. How does PHP validate that the
// data transferred in a put is a full object? And how do they
// validate that a patch only contains "some" columns - not all...?
function patch(req, res) {

	Category.findById(req.params.id)
		.exec(function(err, category) {
			if (err) {
				var error = nodesError.wrapError(err);
				return res.status(error.code).send(err);
			} else {

				modelUtils.updateDocument(category, Category, req.body);

				category.save(function(err, category) {

					if (err) {
						var error = nodesError.wrapError(err);
						return res.status(error.code).send(err);
					} else {
						res.json(category);
					}

				});
			}
		});

}

/**
 * Remove a category.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {String} an empty string
 * @api public
 */
function remove(req, res) {

	Category.findById(req.params.id)
		.exec(function(err, category) {
			if (err) {
				var error = nodesError.wrapError(err);
				return res.status(error.code).send(err);
			} else {

				category.remove(function(err) {

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
function _buildQueryObject(queryParam) {

	return {

	}

}

module.exports = {
    findById: findById,
    findAll: findAll,
    create: create,
	put: put,
	remove: remove
};
