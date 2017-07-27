
// BASE SETUP
// =============================================================================
let config = require('config')
let mongoose = require('mongoose');
let morgan = require('morgan');
// mongoose.connect('mongodb://127.0.0.1:27017/pushBot');
let options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

mongoose.connect(config.DBHost, options);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// call the packages we need
let express = require('express');        // call express
let app = express();                 // define our app using express
let bodyParser = require('body-parser');

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

// configure app to use bodyParser()
// this will let us get the data from a POST
let port = process.env.PORT || 8080;        // set our port
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /apilet routes = require('./routes/index');
let router = express.Router();              // get an instance of the express Router
let routes = require('./routes/index');
app.use('/', routes);
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('app started on port ' + port);

// for testing 
module.exports = app;
