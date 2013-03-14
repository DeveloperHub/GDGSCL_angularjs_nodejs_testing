// Start listening
var app = require('./server/app')
	, port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log('Express server listening on port %s', port);
});