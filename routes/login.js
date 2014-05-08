'use strict'

var mongoose = require('mongoose');
var inicia = require('../models/user');
var User = mongoose.model('User');

var cleanString = require('../helpers/cleanString');
var hash = require('../helpers/hash');
var crypto = require('crypto');

module.exports = function(app) {
	app.get('/signup', function(req, res) {
		res.render('signup.jade');
	});

	// Crear nueva cuenta
	app.post('/signup', function(req, res, next) {
		var email = cleanString(req.param('email'));
		var pass = cleanString(req.param('pass'));
		if (!(email && pass)) {
			return invalid();
		}

		User.findById(email, function(err, user) {
			if (err) return next(err);

			if (user) {
				return res.render('signup.jade', {	exists: true });
			}

			crypto.randomBytes(16, function (err, bytes) {
				if (err) return next(err);

				var user = { _id: email };
				user.salt = bytes.toString('utf8');
				user.hash = hash(pass, user.salt);

				User.create(user, function (err, newUser) {
					if (err) {
						if (err instanceof mongoose.Error.ValidationError) {
							return invalid();
						}
						return next(err);
					}

					// Usuario creado correctamente
					req.session.isLoggedIn = true;
					req.session.user = email;
					console.log('Usuario creado: %s', email);
					return res.redirect('/');
				})
			})
		})
		function invalid() {
			return res.render('signup.jade', { invalid: true });
		}
	});

	app.get('/login', function (req, res) {
		res.render('login.jade');
	});

	app.post('/login', function (req, res, next) {
		// Validamos el login
		var email = cleanString(req.param('email'));
		var pass = cleanString(req.param('pass'));
		if (!(email && pass)) {
			return invalid();
		}

		User.findById(email, function (err, user) {
			if (err) return next(err);

			if (!user) {
				return invalid();
			}

			if (user.hash != hash(pass, user.salt)) {
				return invalid();
			}

			// Usuario creado correctamente
			req.session.isLoggedIn = true;
			req.session.user = email;
			return res.redirect('/');			
		})

		function invalid() {
			return res.render('login.jade', { invalid: true });
		}		
	});

	app.get('/logout', function (req, res) {
		req.session.isLoggedIn = false;
		req.session.user = undefined;
		return res.redirect('/');
	});
}