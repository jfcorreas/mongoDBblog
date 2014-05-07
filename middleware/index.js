'use strict'

var express = require('express');

module.exports = function (app) {
	app.use(express.logger('dev'));

	// para sesiones persistentes mejor usar connect-mongo
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'building a blog' }));
	app.use(express.bodyParser());

	app.use(function(req, res, next) {
		res.locals.session = req.session;
		next();
	})
}