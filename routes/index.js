'use strict'

var errors = require('./errors');
var login = require('./login');
var middleware = require('../middleware');

module.exports = function(app) {

	middleware(app);

	// home page
	app.get('/', function(req,res) {
		res.render('home.jade');
	})

	// login / logout routes
	login(app);

	// gestión de errores
	errors(app);
}