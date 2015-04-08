/*
 	Module Dependencies
 */
var fs = require('fs');

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

	});

};