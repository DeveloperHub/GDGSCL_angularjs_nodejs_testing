module.exports = function(){

	var express = require('express');
	var resource = require('express-resource');

	var app = express();
	var db = require("mongojs").connect("gdg:gdg@ds039417.mongolab.com:39417/gdg-pages", ["pages"]);

	// Configuring

	app.configure(function(){
		app.use(express.bodyParser());
		app.use(express.static(__dirname + '/../public'));
		app.use(app.router);
	});

	/*
	app.configure('development', function(){
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	});

	app.configure('production', function(){
		app.use(express.errorHandler());
	});
	*/

	// Routes

	app.resource('api/v1/pages', require('./resources/pages')(db));
	app.get('/', function(req, res){ 
		rs.sendFile('index.html');
	});

	// Start listening
	
	var port = process.env.PORT || 3000;
	app.listen(port, function(){
		console.log('Express server listening on port %s', port);
	});

	return app;
};