var http = require('http');
var server = http.createServer();
var db = require('./models');

server.on('request', require('./app'));

db.connect()
.then(function() {
	server.listen(3001, function() {
	console.log('Server is listening on port 3001');
	})
})
.catch(console.log)
