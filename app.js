'use strict'

var mongoose = require('mongoose');
var express = require('express');
var routes = require('./routes');

mongoose.connect('mongodb://localhost', function(err) {
	if (err) throw err;
	console.log('Connected to MongoDB')

	var app = express();
	routes(app);

	app.listen(3000, function() {
		console.log('Now listening on http://localhost:3000');
	})
})