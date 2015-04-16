/**
 * Utils for math.
 *
 * @author    Dennis Haulund Nielsen
 * @copyright Copyright (c) 2015, Dennis Haulund Nielsen
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var _    = require('lodash');
var glob = require('glob');
var path = require('path');

/**
 * Return a random number within a given range, including min and max
 *
 * @param {number} min The minimum value (included)
 * @param {number} max The maximum value (excluded)
 * @returns {number}
 *
 * @example
 * randomBewtween(0, 3); // returns a random number from the range 0,1,2
 */
function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

exports.randomBetween = randomBetween;
