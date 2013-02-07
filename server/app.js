module.exports = function(){

    var express = require('express');
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

    app.configure('development', function(){
      app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    });

    app.configure('production', function(){
      app.use(express.errorHandler());
    });

    app.get('/', function(req, res){ res.send('Hello world'); });
    app.get('/api/pages', api.findAll);
    app.get('/api/pages/:slug', api.find);
    app.post('/api/pages', api.save);
    app.post('/api/pages/:slug', api.save);
    app.delete('/api/pages/:slug', api.delete);

    // start listening
    app.listen(3000, function(){
        console.log('Express server listening on port %s', 3000);
    });

    return app;
};


