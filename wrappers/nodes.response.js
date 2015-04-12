"use strict";
var nodeUtil = require('util');

var exports = module.exports = {};

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

//function _wrappedResponse
/*function wrap(response){
	if(_.isArray(response)){
		return new WrappedResponseList(response);
	}else if(_.isObject(response)){
		return new WrappedResponseObject(response);
	}
}

function _wrappedResponseObject(response){
	this.id = uuid.v1();
	this.data = response;
	this.version = 'v1';
	this.date = new Date();
}

function _wrappedResponseList(response){
	this.length = response.length;
	this.data = response;
	this.version = 'v1';
	this.date = new Date();
}

module.exports = wrap;*/