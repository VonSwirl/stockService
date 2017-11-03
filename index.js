const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Set up express app
const stockService = express();

//Connect to mongoDB (Can create a new db by changing products)
mongoose.connect('mongodb://localhost/stock', { useMongoClient: true });
mongoose.Promise = global.Promise;

stockService.use(bodyParser.json());


//This will use the routes specified in api.js
//Initialise routes
stockService.use('/api', routes);

//For error handling
stockService.use(function(error, req, res, next){

    //console.log(error);
    res.status(422).send({error: error.message});

});


//Listen for requests
stockService.listen(process.env.port || 4000, function() { //Listen to request from port or external hosting

console.log('Now listening for requests');

});
