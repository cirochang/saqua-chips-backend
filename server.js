// Grabs our environment variables from the .env file
require('dotenv').config();

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cors = require('cors'),
    app = express();

// Environment configuration
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;

// Create a server side router
var router = express.Router();

// Configure express to handle HTTP requests
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride());

// Define the route endpoints for our application

// Create a new charge
router.post('/charge', function(req, res){
  res.sendStatus(200); // equivalent to res.status(200).send('OK')
});

// Route to get the data for a charge filtered by the charge's id
router.get('/charge/:id', function(req, res){
  res.sendStatus(200); // equivalent to res.status(200).send('OK')
});

// Register the router
app.use('/', router);

// Start the server
app.listen(port, function(){
  console.log('Server listening on port ' + port)
});
