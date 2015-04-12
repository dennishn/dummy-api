"use strict";
/*
 Module Dependencies
 */
var express 	= require('express');
var router 		= express.Router();

var faker 		= require('faker');

var utils		= require('../utils');

var Post 		= require('../models/post');
var Comment 	= require('../models/comment');
var Category	= require('../models/category');

module.exports = function(app) {

	router.route('/helpers/posts/one')
		.get(function(req, res) {

			var post = _generatePost(true);

			res.json(post);

		})
		.post(function(req, res, next) {

			var post = _generatePost();

			post.save(function(err) {
				if(err) { return next(err); }

				res.send('');
			});

		});

	router.route('/helpers/posts/one/comments')
		.post(function(req, res, next) {

			var post = _generatePost();

			var commentsToBeCreated = Math.floor(Math.random() * 17);

			for(var i = 0; i < commentsToBeCreated; i++) {

				var comment = _generateComment(post);

				comment.save();

				post.comments.push(comment);

			}

			post.save(function(err) {
				if(err) { return next(err); }

				res.send('');
			});

		});

	router.route('/helpers/posts/many/:count')
		.post(function(req, res, next) {

			var postsToBeCreated = req.params.count;

			for(var i = 0; i < postsToBeCreated; i++) {

				var post = _generatePost();

				post.save(function(err) {
					if(err) { return next(err); }
				});

			}

			res.send('');

		});

	router.route('/helpers/posts/many/:count/comments')
		.post(function(req, res, next) {

			var postsToBeCreated = req.params.count;

			for(var i = 0; i < postsToBeCreated; i++) {

				var post = _generatePost();

				var commentsToBeCreated = Math.floor(Math.random() * 17);

				for(var j = 0; j < commentsToBeCreated; j++) {

					var comment = _generateComment(post);

					comment.save();

					post.comments.push(comment);

				}

				post.save(function(err) {
					if(err) { return next(err); }
				});

			}
			res.send('');
		});

	router.route('/helpers/comments/one')
		.get(function(req, res) {

			var comment = _generateComment(null, true);

			res.json(comment);

		});

	app.use('/api', router);

};

/*
	Private Methods
 */
function _generatePost(raw) {

	var post;

	if(raw) {
		post = {};
	} else {
		post = new Post();
	}

	var past = new Date();
	past.setMonth(past.getMonth() - 6);

	var notQuitePast = new Date();
	notQuitePast.setMonth(notQuitePast.getMonth() - 3);

	var modifiedDate = faker.date.between(past, notQuitePast);

	post.title = faker.lorem.sentence();
	post.body = faker.lorem.paragraphs();
	post.created = past;
	post.modified = modifiedDate;
	post.categories = [];

	// Populate with a few Categories
	var categoryCount = utils.randomIntFromInterval(0, 3);
	for(var i = 0; i < categoryCount; i++) {

		try {
			var cat = _generateCategory(raw);
			if(cat) {
				post.categories.push(_generateCategory(raw));
			}
		} catch(e) {

		}
	}

	return post;
}

function _generateComment(post, raw) {

	var comment;

	if(raw) {
		comment = {}
	} else {
		comment = new Comment();
	}

	comment.body = faker.lorem.sentences();

	if(!raw) {
		comment.post = post;
	}

	return comment;

}

function _generateCategory(raw) {

	var categories = [
		'Technology',
		'Politics',
		'Finance',
		'Art',
		'Sports',
		'Entertainment',
		'Music'
	];

	var categoryIndex = utils.randomIntFromInterval(0, categories.length-1);
	var selectedCatergory = categories[categoryIndex];

	var category;

	if(raw) {
		category = selectedCatergory
	} else {
		category = new Category({_id: selectedCatergory});
		category.save();
	}

	return category;

}