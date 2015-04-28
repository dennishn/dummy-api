/**
 * mongoose-paginate
 * https://github.com/song940/mongoose-paginate
 * adapted from mongoose-paginate and modified for Nodes API standards
 */
'use strict';
var Query = require('mongoose').Query;

/**
 * loadmore
 *
 * @param {Object} options
 */
Query.prototype.loadmore = function(options, callback) {
	var defaults = {
		perPage: 10, // Number of items to display on each page.
		lastId: null,
		params : {}
	};

	for(var key in options){
		if(options.hasOwnProperty(key)) {
			defaults[key] = options[key];
		}
	}

	options = defaults;
	options.perPage = parseInt(options.perPage);

	var query = this;
	var model = query.model;

	// Valider mod mongoose type
	if(options.lastId) {
		query.where({_id: {$gt: options.lastId}});
	}

	model.count(query._conditions, function(err, count) {
		query.limit(options.perPage).exec(function(err, results) {
			if (err) {
				callback(err, {});
				return;
			}

			var sections = Math.ceil(count / options.perPage);

			var pager = {
				'data': results,
				'meta': {
					'loadmore': {
						'options': options,
						'sections': sections,
						'count': count
					}
				}
			};

			callback(err, pager);
		});
	});

};