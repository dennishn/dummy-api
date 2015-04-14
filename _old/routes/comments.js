/*
 Module Dependencies
 */
var express = require('express');
var router 	= express.Router();

var utils = require('../utils');

var Post = require('../models/post');
var Comment = require('../models/comment');

module.exports = function(app) {

	/*
	 Order of HTTP METHODS:
	 - get
	 - post
	 - put
	 - delete

	 Order of URIs:
	 - /foo
	 - /foo/:id
	 - /foo/:id/bar
	 - /foo/:id/bar/:id

	 - /bar
	 - /bar/:id
	 - /bar/:id/baz
	 - /bar/:id/baz/:id

	 etc.
	 */

	/*
		 DRY Principles:
	 	Register route parameters to always return the corrensponding objects
	 */
	router.param('comment', function(req, res, next, id) {

		var query = Comment.findById(id);

		query.exec(function(err, comment) {
			if(err) {return next(err);}

			// 404ify?
			if(!comment) {return next(new Error('Post not found'));}

			req.comment = comment;
			return next();
		});

	});

	/*
	 Routes that ends in /comments/:id
	 */
	router.route('/comments/:comment')
		.get(function(req, res, next) {

			// Since the Comment is attached to the request using the registered
			// route parameter, there is no need to look it up here.

			// Return the attached comment
			res.json(req.comment);

		})
		.put(function(req, res, next) {

			// There is no simple way in Mongoose to extend one object into another,
			// Stackoverflow had a nice answer on how to handle this.
			// Code is in the root folder under utils.js
			utils.updateDocument(req.comment, Comment, req.body);

			// Save the updated Comment and return it
			req.comment.save(function(err, comment) {
				if(err) { return next(err); }

				res.json(comment);
			});

		})
		.delete(function(req, res, next) {

			// Delete the Comment and return an empty response (200 OK)
			req.comment.remove(function(err){

				if(err) { return next(err); }

				res.send('');

			});

		});

	// Register router
	app.use('/api', router);

};