/*
	Express Module Dependencies
 */
var express = require('express');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/*
	Expose file
 */
module.exports = function(app) {

	// Logging
	app.use(morgan('dev'));

	// BodyParser
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

	// CookieParser
	app.use(cookieParser());

};