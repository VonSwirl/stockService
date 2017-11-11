const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const path = require('path');


//var db = mongoose.connect('mongodb://rib1356:rib1356@ds042687.mlab.com:42687/stockservice', { useMongoClient: true });

//Set up express app
const stockService = express();

stockService.set('views', path.join(__dirname, 'views'));
stockService.set('view engine', 'pug');

//Sets a link for css and js to be used in pug file
stockService.use('/static', express.static('public'));

//Set up database connections
var uri = 'mongodb://rib1356:rib1356@ds042687.mlab.com:42687/stockservice';
mongoose.Promise = global.Promise;

mongoose.connect(uri, { useMongoClient: true }); //Stops from being deprecated
module.exports = exports.mongoose;
//Connect to mongoDB (Can create a new db by changing products)
//mongoose.connect('mongodb://localhost/stock', { useMongoClient: true });

stockService.use(bodyParser.json());


//This will use the routes specified in api.js
//Initialise routes
stockService.use('/api', routes);

//For error handling
stockService.use(function(error, req, res, next){

    console.log(error);
    res.status(422).send({error: error.message});

});


//Listen for requests
stockService.listen(process.env.port || 4000, function() { //Listen to request from port or external hosting

console.log('Now listening for requests');

});
