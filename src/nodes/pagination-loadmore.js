/**
 * mongoose-paginate
 * https://github.com/song940/mongoose-paginate
 * adapted from mongoose-paginate and modified for Nodes API standards
 */
'use strict';
var Query = require('mongoose').Query;

/**
 * paginate
 *
 * @param {Object} options
 */
Query.prototype.paginate = function(options, callback) {
	var defaults = {
		perPage: 10, // Number of items to display on each page.
		delta  :  5, // Number of page numbers to display before and after the current one.
		page   :  1,  // Initial page number.
		params : {}
	};

	for(var key in options){
		defaults[key] = options[key];
	}

	options = defaults;


	var delta = options.delta;
	var current = parseInt(options.page, 10) || 1;

	var query = this;
	var model = query.model;
	model.count(query._conditions, function(err, count) {
		var _skip = (current - 1) * options.perPage;
		query.skip(_skip).limit(options.perPage).exec(function(err, results) {
			if (err) {
				callback(err, {});
				return;
			}

			results = results || [];

			var last = Math.ceil(count / options.perPage);

			var start = Math.max(current - delta, 1);
			var end   = Math.min(current + delta, last);

			var pages = [];
			for (var i = start; i <= end; i++) {
				pages.push(i);
			}

			var prev = Math.max(current - 1, start);
			var next = Math.min(current + 1, end);

			var pager = {
				'data': results,
				'meta': {
					'pagination': {
						'options': options,
						'current': current,
						'last': last,
						'prev': prev,
						'next': next,
						'pages': pages,
						'count': count
					}
				}
			};

			callback(err, pager);
		});
	});
};

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
	console.log('helloadmore');

	for(var key in options){
		defaults[key] = options[key];
	}

	options = defaults;

	var current = parseInt(options.page, 10) || 1;

	var query = this;
	var model = query.model;

	//console.log(query);

	query.where({_id: {$gt: options.lastId}}).exec(function(err, results) {
		if (err) {
			callback(err, {});
			return;
		}

		var pager = {
			'data': results
		};

		callback(err, pager);
	});
	/*model.count(query._conditions, function(err, count) {
		var _skip = (current - 1) * options.perPage;
		query.skip(_skip).limit(options.perPage).exec(function(err, results) {
			if (err) {
				callback(err, {});
				return;
			}

			results = results || [];

			var last = Math.ceil(count / options.perPage);

			var start = Math.max(current - delta, 1);
			var end   = Math.min(current + delta, last);

			var pages = [];
			for (var i = start; i <= end; i++) {
				pages.push(i);
			}

			var prev = Math.max(current - 1, start);
			var next = Math.min(current + 1, end);

			var pager = {
				'data': results,
				'meta': {
					'pagination': {
						'options': options,
						'current': current,
						'last': last,
						'prev': prev,
						'next': next,
						'pages': pages,
						'count': count
					}
				}
			};

			callback(err, pager);
		});
	});*/
};