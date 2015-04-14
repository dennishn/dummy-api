"use strict";
var nodeUtil = require('util');

var exports = module.exports = {};

/*
 Public Methods
 */
exports.isInterceptable = function(response) {

	if(!response) {
		return false;
	}

	var body;

	try {
		body = JSON.parse(response);
	} catch(e) {
		return false;
	}

	return (_isArray(body) || _isObject(body));

};

exports.transformBody = function(response) {

	var body = JSON.parse(response);

	if(_isArray(body)) {
		body = _wrapArray(body);
	} else if(_isObject(body)) {
		body = _wrapObject(body);
	}
	return body;

};

/*
 Private Methods
 */
function _isArray(array) {
	return nodeUtil.isArray(array);
}

function _isObject(object) {
	return (typeof object === 'object');
}

function _createBaseSchema() {

	var schema = {
		data: null
	};

	return schema;
}

function _wrapArray(array) {

	var response = _createBaseSchema();

	response.data = array;

	response = JSON.stringify(response);

	return response;

}

function _wrapObject(object) {

	var response = _createBaseSchema();

	response.data = object;

	response = JSON.stringify(response);

	return response;

}