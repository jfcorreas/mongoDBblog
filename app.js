'use strict'

var mongoose = require('mongoose');
var express = require('express');

mongoose.connect('mongodb://localhost', function(err) {
	if (err) throw err;
	console.log('Connected to MongoDB')

	var app = express();
	app.get('/', function (req, res) {
		res.send(200, 'Hello mongoose blog');
	})

	app.listen(3000, function() {
		console.log('Now listening on http://localhost:3000');
	})
})