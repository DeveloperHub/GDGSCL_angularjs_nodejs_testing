
var express = require('express')
	, resource = require('express-resource')
	, app = express()
	, db = require("mongojs").connect("gdg:gdg@ds039417.mongolab.com:39417/gdg-pages", ["pages"]);

// Configuring
app.configure(function(){
	app.use(express.bodyParser());
	app.use(express.static(__dirname + '/../public'));
	app.use(app.router);
});

// Routes
app.resource('api/v1/pages', require('./resources/pages')(db));
app.get('/', function(req, res){ 
	rs.sendFile('index.html');
});

module.exports = app;