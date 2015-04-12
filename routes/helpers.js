"use strict";
/*
 Module Dependencies
 */
var express = require('express');
var router 	= express.Router();

var faker = require('faker');

var Post = require('../models/post');
var Comment = require('../models/comment');

module.exports = function(app) {

	router.route('/helpers/posts/add-one')
		.post(function(req, res, next) {

			var post = _generatePost();

			post.save(function(err) {
				if(err) { return next(err); }

				res.send('');
			});

		});

	router.route('/helpers/posts/add-one/comments')
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

	app.use('/api', router);

};

/*
	Private Methods
 */
function _generatePost() {

	var post = new Post();

	var past = new Date();
	past.setMonth(past.getMonth() - 6);

	var notQuitePast = new Date();
	notQuitePast.setMonth(notQuitePast.getMonth() - 3);

	var modifiedDate = faker.date.between(past, notQuitePast);

	post.title = faker.lorem.sentence();
	post.body = faker.lorem.paragraphs();
	post.created = past;
	post.modified = modifiedDate;

	return post;
}

function _generateComment(post) {

	var comment = new Comment();

	comment.body = faker.lorem.sentences();
	comment.post = post;

	return comment;

}