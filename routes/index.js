/*
 	Module Dependencies
 */
var fs = require('fs');

var express = require('express');
var router 	= express.Router();

var wrapResponse = require('../wrappers/nodes.response');

/*
	Expose Module
 */
module.exports = function (app) {

	/*
	 	Bootstrap routes
	 */

	fs.readdirSync(__dirname).forEach(function(file) {

		if (file === 'index.js') {
			return;
		}

		var name = file.substr(0, file.indexOf('.'));

		require('./' + name)(app);

		router.route('*')
			.all(function(req, res, next) {
				console.log('EVERYTHING GOES BY ME!', res.body);
				next();
			});

		app.use('/api', router);

	});

};