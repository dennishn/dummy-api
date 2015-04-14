"use strict";
var nodeUtil = require('util');

var exports = module.exports = {};

/*
 	Public Methods
 */
exports.setAccept = function(response) {
	response.set('Accept', 'application/vnd.nodes.v1+json');
};
exports.removeAccept = function(response) {
	response.removeHeader('Accept');
};

exports.setAuthorization = function(response, token) {
	response.set('Authorization', token);
};
exports.removeAuthorization = function(response) {
	response.removeHeader('Authorization');
};

/*
	No clue, but i go with ISO 639-1
 */
exports.setLanguage = function(response, lang) {
	response.set('Language', lang);
};
exports.removeLanguage = function(response) {
	response.removeHeader('Language');
};