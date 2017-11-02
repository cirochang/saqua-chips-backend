// server.js
var express = require('express');
var app = express();
var port = 8080;

//route our app
var routes = require('./app/routes');
app.use('/', routes);

app.use(express.static(__dirname + '/public'));

// start the server
app.listen(port, function() {
  console.log('app started');
});
