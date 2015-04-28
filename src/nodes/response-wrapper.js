/**
 * Response Wrapper.
 *
 * @author    Dennis Haulund Nielsen
 * @copyright Copyright (c) 2015, Dennis Haulund Nielsen
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Wraps data to be returned via the API so that it follows the Nodes standards
 *
 * @param {Object} res The response data to wrap
 * @returns {Object}
 *
 */
function wrapResponse(res) {
	return {
		data: res
	};
}

exports.wrapResponse = wrapResponse;
