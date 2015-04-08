/*
	Core Modules
 */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

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
	Route Modules
 */
var routes = require('./routes/index');
var users = require('./routes/users');

/*
	Application setup
 */
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/*
	Application routing
 */
app.use('/', routes);
app.use('/users', users);

/*
	Error handling
 */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// catch other errors
app.use(function(err, req, res, next) {
	var error = new Error(err.message);
	error.status = err.status || 500;
	next(err);
});

app.listen(serverPort, function() {
	console.log('Express server listening on port: ', serverPort);
});