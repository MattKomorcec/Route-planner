
// At the start of the file, we include everything we need for our app to run
var express = require('express');
var app  = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var apiRoutes = require('./routes/main.js');

// Sets mongoose Promise to global Promise => not necessary to run the app
mongoose.Promise = global.Promise;

var User = require('./models/user'); // get our mongoose model

// This is our database
var database = 'mongodb://localhost:27017/zavrsni';

var port = process.env.PORT || 8080; // port of our app
mongoose.connect(database); // connect to database

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));
// Set a secret token used with jwt for validating tokens
app.set('secretCode', 'HEHE');

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);