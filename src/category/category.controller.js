/**
 * Tag controller.
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

var Tag            = require('./category.model.js');

/**
 * List of tags.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Array} the list of tags
 * @api public
 */
function findAll(req, res) {
	console.log(req.params);
    Tag.find()
        .populate('author')
        .exec(function(err, tags) {
            if (err) {
                console.error(err.message);
                return res.status(400).send(err);
            } else {
                res.json(tags);
            }
        });
}

/**
 * Create a tag.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Object} the created tag
 * @api public
 */
function create(req, res) {

    var tag = new Tag({_id: req.body.name});

    tag.save(function(err, tag) {
        if (err) {
            var error = nodesError.wrapError(err);
            return res.status(error.code).send(err);
        } else {
            res.json(tag);
        }
    });
}

/**
 * Remove a tag.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {String} an empty string
 * @api public
 */
function remove(req, res) {

	Tag.findById(req.params.id)
		.exec(function(err, tag) {
			if (err) {
				var error = nodesError.wrapError(err);
				return res.status(error.code).send(err);
			} else {

				tag.remove(function(err) {

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
