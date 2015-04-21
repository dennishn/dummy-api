/**
 * Error Handler.
 *
 * @author    Dennis Haulund Nielsen
 * @copyright Copyright (c) 2015, Dennis Haulund Nielsen
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */

/**
 * Wraps an Error that follows the Nodes standards
 *
 * @param {Object} err The error to wrap
 * @returns {Object}
 *
 */
function wrapError(err) {
	console.log(err.name, 'Error Wrapper')
	switch(err.name) {
		case 'ValidationError':
			err.code = 412;
			break;
		case 'CastError':
			err.code = 400;
			err.message = 'Invalid ID provided';
			break;
		case 'ResourceNotFound':
			err.code = 445;
			err.message = 'Resource not found';
			break;
		case 'MissingAccept':
			err.code = 440;
			err.message = 'Missing Accept Header';
			break;
		default:
			err.code = 400;
			break;
	}
	return err;
}

exports.wrapError = wrapError;
