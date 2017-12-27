// Grabs our environment variables from the .env file
require('dotenv').config();

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cors = require('cors'),
    morgan = require('morgan'),
    app = express();


var mongoose = require('mongoose'),
    User = require('./api/models/User'),
    GroupProduct = require('./api/models/GroupProduct'),
    Product = require('./api/models/Product'),
    Demand = require('./api/models/Demand');


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
var mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost/saquachips';
mongoose.connect(mongodbUri);

var bootstrap = require('./tools/bootstrap.js');
bootstrap.create_default_admin();

// Environment configuration
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;

// Create a server side router
var router = express.Router();

// Configure express to handle HTTP requests
app.set('superSecret', 'dosdeira104');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());
app.use(morgan('dev'));


var routes = require('./api/routes/routes.js');
routes(app);

// Start the server
app.listen(port, function(){
  console.log('Server listening on port ' + port);
});
