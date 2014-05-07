'use strict'

var errors = require('./errors');

module.exports = function(app) {

	// home page
	app.get('/', function(req,res) {
		res.render('home.jade');
	})

	// gestión de errores
	errors(app);
}