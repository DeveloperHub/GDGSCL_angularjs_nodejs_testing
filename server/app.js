module.exports = function(){

	var express = require('express');
	var fs = require('fs');
	var app = express();

	var databaseUrl = "gdg:gdg@ds039417.mongolab.com:39417/gdg-pages"; 
	var collections = ["pages"]
	var db = require("mongojs").connect(databaseUrl, collections);

	var api = require('./api')(db);

	app.configure(function(){
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.static(__dirname + '/../public'));
		app.use(app.router);
	});

	// Conf errror handlering

	app.configure('development', function(){
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	});

	app.configure('production', function(){
		app.use(express.errorHandler());
	});

	// Routes

	app.get('/api/pages', api.findAll);
	app.get('/api/pages/:slug', api.find);
	app.post('/api/pages', api.create);
	app.put('/api/pages/:slug', api.save);
	app.delete('/api/pages/:slug', api.delete);
	app.get('/*', function(req, res){ 
		fs.readFile(__dirname + '/../public/index.html', 'utf8', function (err, data) {
			if (err) throw err;
			
			res.send(data);
		});
	});

	// Start listening
	
	var port = process.env.PORT || 3000;
	app.listen(port, function(){
		console.log('Express server listening on port %s', port);
	});

	return app;
};


