/*
 Module Dependencies
 */
var express = require('express');
var router 	= express.Router();

var Post = require('../models/post');
var Comment = require('../models/comment');

module.exports = function(app) {

	// Routes that ends in /posts
	router.route('/posts')
		.post(function(req,res) {

			var data = req.body;

			var post = new Post({
				title: data.title
			});

			post.save(function(err) {

				if(err) {
					res.send(err);
				}

				res.json(post);

			});

		})
		.get(function(req, res) {

			Post.find(function(err, posts) {

				if(err) {
					res.send(err);
				}

				res.json(posts);

			});

		});

	// Routes that ends in /posts/:id
	router.route('/posts/:postId')
		.get(function(req, res) {

			Post.findById(req.params.postId, function(err, post) {

				if(err) {
					res.send(err);
				}

				res.json(post);

			});

		})
		.put(function(req, res) {

			Post.findById(req.params.postId, function(err, post) {

				if(err) {
					res.send(err);
				}

				post.title = req.body.title;

				post.save(function(err) {

					if(err) {
						res.send(err);
					}

					res.json(post);

				});

			});

		})
		.delete(function(req, res) {

			Post.remove({
				_id: req.params.postId
			}, function(err, post) {

				if(err) {
					res.send(err);
				}

				res.json({
					message: 'Post deleted'
				});

			});

		});

	router.route('/posts/:postId/comments')
		.post(function(req, res) {

			var data = req.body;

			var comment = new Comment({
				content: data.content
			});


			Post.findById(req.params.postId, function(err, post) {

				if(err) {
					res.send(err);
				}

				post.comments.push(comment);

				post.save(function(err) {

					if(err) {
						res.send(err);
					}

					res.json(comment);

				});

			});

		});

	app.use('/api', router);
};