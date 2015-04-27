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

var Category             = require('./category.model.js');

/**
 * List of categorys.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Array} the list of categorys
 * @api public
 */
function findAll(req, res) {
	console.log(req.params);
    Category.find()
        .populate('author')
        .exec(function(err, categorys) {
            if (err) {
                console.error(err.message);
                return res.status(400).send(err);
            } else {
                res.json(categorys);
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

    var category = new Category({_id: req.body.name});

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

module.exports = {
    findAll: findAll,
    create: create,
	remove: remove
};
