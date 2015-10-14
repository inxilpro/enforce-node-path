'use strict';

var resolve = require('path').resolve;

module.exports = function(path) {
	var resolvedPath = resolve(path);
	if (!process.env.NODE_PATH || resolve(process.env.NODE_PATH) !== resolvedPath) {
		throw new Error('NODE_PATH environmental variable must be set to "' + resolvedPath + '"');
	}
}