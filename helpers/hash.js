'use strict'

var crypto = require('crypto');

module.exports = function (pass, salt) {
	var hash = crypto.createHash('sha512');
	hash.update(pass, 'utf8');
	hash.update(pass, 'utf8');
	return hash.digest('base64');
}