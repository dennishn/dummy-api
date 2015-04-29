/**
 * This module follow best practice for creating, maintaining and using a Mongoose connection like:
 *  - open the connection when the app process start
 *  - start the app server when after the database connection is open (optional)
 *  - monitor the connection events (`connected`, `error` and `disconnected`)
 *  - close the connection when the app process terminates
 *
 * @author    Dennis Haulund Nielsen
 * @copyright Copyright (c) 2015, Dennis Haulund Nielsen
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
//var logger   = require('mm-node-logger')(module);
var mongoose = require('mongoose');
var config = require('./config');

/**
 * Create mongoose connection.
 *
 * @param {*=} cb The callback that start server
 */
function createMongooseConnection(cb) {
    // create the database connection
    mongoose.connect(config.mongodb.dbURI, config.mongodb.dbOptions);

    // when successfully connected
    mongoose.connection.on('connected', function () {
        console.info('Mongoose connected to ' + config.mongodb.dbURI);
    });

    // if the connection throws an error
    mongoose.connection.on('error', function (err) {
        console.error('Mongoose connection error: ' + err);
    });

    // when the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        console.info('Mongoose disconnected');
    });

    // when the connection is open
    mongoose.connection.once('open', function () {
        if(cb && typeof(cb) === 'function') {cb();}
    });

    // if the Node process ends, close the Mongoose connection
    process.on('SIGINT', function() {
        mongoose.connection.close(function () {
            console.info('Mongoose disconnected through app termination');
            process.exit(0);
        });
    });
}

module.exports = createMongooseConnection;
