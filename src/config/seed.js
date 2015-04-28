/**
 * Populate DB with sample data on server start to disable, edit config.js, and set `seedDB: false`
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose    = require('mongoose');
var faker       = require('faker');
var mathUtils	= require('../utils/math.utils');

var User        = require('../user/user.model');
var Category	= require('../category/category.model');
var Post		= require('../post/post.model');
var Image       = require('../image/image.model');

var id;

/*
	Seed Users
 */
var users       = [];
var uIDs        = [];
var usersCount  = 3;
var uI          = 0;
var uIdI		= 0;
// Create and store user id's in memory so other seeders can utilize them
while(uIdI < usersCount) {
    id = mongoose.Types.ObjectId();
    uIDs.push(id);
	uIdI++;
}
id = undefined;
// Populate an array of users to be created
while(uI < usersCount) {
    var user = {
        _id: uIDs[uI],
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        avatar: faker.internet.avatar()
    };
    users.push(user);
    uI++;
}
// Remove any previous users and seed the DB
User.find({}).remove(function() {
    User.create(users, function() {
            console.info('Finished populating users');
        }
    );
});
/*
 Seed Categories
 */
var categories	= ['Technology', 'Politics', 'Culture', 'Sport', 'Finance'];

var catArr		= [];
var cI			= 0;

//while(cIdI < categories.length) {
//	id = mongoose.Types.ObjectId();
//	cIDs.push(id);
//	cIdI++;
//}
while(cI < categories.length) {

	var category = {
		_id: id = mongoose.Types.ObjectId(),
		name: categories[cI]
	};

	catArr.push(category);
	cI++;

}
// Remove any previous categories and seed the DB
Category.find({}).remove(function() {
	Category.create(catArr, function(err, foo) {
		console.info('Finished populating categories');
	});
});
/*
 Seed Posts
 */
var posts       = [];
var postsCount  = 30;
var pI          = 0;
// Populate an array of posts to be created
while(pI < postsCount) {

	var authIDindex = mathUtils.randomBetween(0, uIDs.length);

	var catIDindex = mathUtils.randomBetween(0, categories.length);

	var tags = [];
	var tagsCount = mathUtils.randomBetween(0, 10);

	for(var i = 0; i < tagsCount; i++) {
		tags.push(faker.hacker.noun());
	}


	var post = {
		cover_image: faker.image.imageUrl(),
		title: faker.lorem.sentence(),
		body: faker.lorem.sentences(),
		likes: mathUtils.randomBetween(0, 100),
		author: uIDs[authIDindex],
		category: mongoose.Types.ObjectId(catArr[catIDindex]._id),
		tags: tags
	};
	posts.push(post);
	pI++;
}
// Remove any previous posts and seed the DB
Post.find({}).remove(function() {
	Post.create(posts, function(err, posts) {
			console.info('Finished populating posts');
		}
	);
});


//Image.find({}).remove(function() {
//    Image.create({
//        fileName : 'Slovakia 1',
//        url : 'http://www.rocketroute.com/wp-content/uploads/Carpathian-mountains-Slovakia-685x458.jpg?125416',
//        user: testUserId
//    }, {
//        fileName : 'Slovakia 2',
//        url : 'http://www.travelslovakia.sk/images/blog/small-group-tours/tatra-mountains-self-guided.jpg?125416',
//        user: testUserId
//    }, {
//        fileName : 'Slovakia 3',
//        url : 'http://www.travelslovakia.sk/images/day-tours/high-tatras.jpg?125416',
//        user: testUserId
//    }, function() {
//        console.info('Finished populating images');
//    });
//});
