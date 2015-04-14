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
var logger      = require('mm-node-logger')(module);
var mongoose    = require('mongoose');
var faker       = require('faker');
var User        = require('../user/user.model');
var Image       = require('../image/image.model');

var users       = [];
var usersCount  = 3;
var uI          = 0;
while(uI < usersCount) {
    var user = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        avatar: faker.internet.avatar()
    };
    users.push(user);
    uI++;
}

User.find({}).remove(function() {
    User.create(users, function() {
            console.info('Finished populating users');
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
