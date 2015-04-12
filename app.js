/*
	Core Module Dependencies
 */
var fs = require('fs');

var express = require('express');
var mongoose = require('mongoose');
var interceptor = require('express-interceptor');

var nodesResponse = require('./wrappers/nodes.response');
var nodesHeaders = require('./wrappers/nodes.headers.js');

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
	Global Response interceptor
 */
var nodesInterceptor = interceptor(function(req, res){
	return {
		// Bypass this
		isInterceptable: function(){
			return true;
		},
		/*
			If the response is an object or array - we transform the response
			according to the Nodes API specs
		 */
		intercept: function(body, send) {

			nodesHeaders.setAccept(res);
			nodesHeaders.setLanguage(res, 'en');

			// If the response is neither object or array, bypass intercepting
			if(!nodesResponse.isInterceptable(body)) {
				send(body);
				return;
			}

			var transformedBody = nodesResponse.transformBody(body);

			send(transformedBody);
		}
	};
});
app.use(nodesInterceptor);

/*
	Bootstrap Routes
 */
require('./routes')(app);

app.listen(serverPort, function() {
	console.log('Express server listening on port: ', serverPort);
});