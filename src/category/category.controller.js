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
var mongoose		= require('mongoose');

var modelUtils		= require('../utils/model-utils');

var nodesError      = require('../nodes/error');
var responseWrapper	= require('../nodes/response-wrapper');
var paginator		= require('../nodes/pagination-pages');
var loadmore		= require('../nodes/pagination-loadmore');

var Category             = require('./category.model.js');

/**
 * List of categorys.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Array} the list of categories
 * @api public
 */
function findAll(req, res) {

    var query = Category.find().sort(req.query.sort || '-created');

    if(req.query.hasOwnProperty('lastId')) {
        console.log('using loadmore');
        query.loadmore({
            lastId: req.query.lastId || null,
            perPage: req.query.limit || 10
        }, function(err, categories) {
            if (err) {
                console.error(err);
                return res.status(400).send(err);
            } else {
                // This data is wrapped in the loadmore module
                res.json(categories);
            }
        });
    } else {
        console.log('using paginate');
        query.paginate({
            perPage: req.query.limit || 10,
            delta: req.query.delta || 3,
            page: req.query.page || 1
        }, function(err, categories) {
            if (err) {
                console.error(err);
                return res.status(400).send(err);
            } else {
                // This data is wrapped in the paginator module
                return res.json(categories);
            }
        });
    }

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
			var response = responseWrapper.wrapResponse(category);

			res.json(response);
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
						var response = responseWrapper.wrapResponse('');

						res.json(response);
					}

				});

			}
		});

}

module.exports = {
    findAll: findAll,
    create: create,
	remove: remove
};
