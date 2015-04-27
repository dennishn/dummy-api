/**
 * Utils for models.
 *
 * @author    Dennis Haulund Nielsen
 * @copyright Copyright (c) 2015, Dennis Haulund Nielsen
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/*
 Public Methods
 */
exports.updateDocument = function(document, SchemaTarget, data) {

	for(var field in SchemaTarget.schema.paths) {

		if((field !== '_id') && (field !== '__v')) {

			var newValue = _getObjectValue(field, data);

			if(newValue !== undefined) {

				_setObjectValue(field, document, newValue);

			}

		}

	}

	return document;

};

exports.isValidId = function(id) {
	return id.match(/^[0-9a-fA-F]{24}$/);
};

/*
 Private Methods
 */
function _getObjectValue(field, data) {

	var arr = field.split('.');

	return arr.reduce(function(obj, f) {

		if(obj) {
			return obj[f];
		}

	}, data);

}

function _setObjectValue(field, data, value) {

	var arr = field.split('.');

	return arr.reduce(function(obj, f, i) {

		if(i === arr.length-1) {

			obj[f] = value;

		} else {

			if(!obj[f]) {

				obj[f] = {};

			}

		}

		return obj[f];

	}, data);

}