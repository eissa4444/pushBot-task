
// BASE SETUP
// =============================================================================
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/pushBot');

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /apivar routes = require('./routes/index');
var router = express.Router();              // get an instance of the express Router
var routes = require('./routes/index');
app.use('/', routes);
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('app started on port ' + port);
