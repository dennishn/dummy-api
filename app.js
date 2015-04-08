/*
	Core Module Dependencies
 */
var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');

/*
 Application Setup
 */
var app = express();

/*
	Configuration variables
 */
var dbName = 'DummyApi';
var dbConnectionString = 'mongodb://localhost:27017/' + dbName;

var serverPort = 3000;

/*
	Database connection
 */
mongoose.connect(dbConnectionString, function(err) {
	if(err) {
		throw err;
	}
	console.log('Connected to MongoDB instance: ', dbName);
});

/*
	Bootstrap models
 */
fs.readdirSync(__dirname + '/models').forEach(function (file) {
	if (~file.indexOf('.js')) require(__dirname + '/models/' + file);
});

/*
	Bootstrap Application Settings
 */
require('./config/express')(app);

/*
	Bootstrap Routes
 */
require('./routes')(app);

app.listen(serverPort, function() {
	console.log('Express server listening on port: ', serverPort);
});