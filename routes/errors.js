'use strict'

module.exports = function (app) {
	// 404
	app.use(function(req, res, next) {
		res.status(404);

		if (req.accepts('html')) {
			return res.send("<h2>Página no encontrada.</h2>");
		}

		if (req.accepts('json')) {
			return res.json({ error: 'No encontrado'});
		}

		// Respuesta por defecto
		res.type('txt');
		res.send("Página no encontrada.")
	})
	// 500
	app.use(function(err, req, res, next) {
		console.error('Error en %s\n', req.url, err);
		res.send(500,"Se ha producido un error.")
	})	
}