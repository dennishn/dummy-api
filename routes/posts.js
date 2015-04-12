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
	 */
	// Register route parameters to always return the corrensponding objects
	router.param('post', function(req, res, next, id) {

		var query = Post.findById(id);

		query.exec(function(err, post) {
			if(err) {return next(err);}

			// 404ify?
			if(!post) {return next(new Error('Post not found'));}

			req.post = post;
			return next();
		});

	});

	/*
	 	Routes that ends in /posts
	 */
	router.route('/posts')
		.get(function(req, res, next) {

			// Find all Posts and return them
			Post.find(function(err, posts) {
				if(err) { return next(err); }

				res.json(posts);
			});

		})
		.post(function(req, res, next) {

			// Create a new Post based on the requested body data
			var post = new Post(req.body);

			// Save the new Post and return it
			post.save(function(err, post) {
				if(err) { return next(err); }

				res.json(post);
			});

		});

	/*
	 	Routes that ends in /posts/:id
	 */
	router.route('/posts/:post')
		.get(function(req, res, next) {

			// Since the Post is attached to the request using the registered
			// route parameter, there is no need to look it up here.

			// Populate the Post document with it's registered Comments and return it
			req.post.populate('comments', function(err, post) {

				if(err) { return next(err); }

				res.json(post);

			});

		})
		.put(function(req, res, next) {

			// Update the Post's modified date field
			req.body.modified = Date.now();

			// There is no simple way in Mongoose to extend one object into another,
			// Stackoverflow had a nice answer on how to handle this.
			// Code is in the root folder under utils.js
			utils.updateDocument(req.post, Post, req.body);

			// Save the updated Post and return it
			req.post.save(function(err, post) {
				if(err) {
					console.log(err);
				}

				res.json(post);
			});
		})
		.delete(function(req, res, next) {

			// Delete the Post and return an empty response (200 OK)
			req.post.remove(function(err){

				if(err) { return next(err); }

				res.send('');

			});

		});

	/*
	 	Routes that ends in /posts/:id/comments
	 */
	router.route('/posts/:post/comments')
		.get(function(req, res, next) {

			// Find all comments with the Post id and return them
			Comment.find({post: req.post._id}, function(err, comments) {

				if(err) { return next(err); }

				res.json(comments);

			});

		})
		.post(function(req, res, next) {

			// Dette kan gøres pænere, ved at rydde op i comment response obj

			var comment = new Comment(req.body);

			comment.post = req.post;

			comment.save(function(err, comment) {

				if(err) { return next(err); }

				req.post.comments.push(comment);

				req.post.save(function(err, post) {

					if(err) { return next(err); }

					res.json(comment);

				});

			});

		});

	// Register router
	app.use('/api', router);
};