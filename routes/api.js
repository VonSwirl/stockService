const express = require('express');
const router = express.Router();
const Product = require('../models/stock');

//Get a list of stock from database (very simple)
router.get('/stock',function(req, res, next){
res.send({type:'GET'});

});

//Add another product to database
router.post('/stock',function(req, res, next){
  Product.create(req.body).then(function(product) { //Will create a new instance then save to db
    res.send(product);

  }).catch(next)
});

//Update a product in database (use this for changing price)
router.put('/stock/:id',function(req, res, next){
  res.send({type:'PUT'});

});

//Delete a product from database
router.delete('/stock/:id',function(req, res, next){
  res.send({type:'DELETE'});

});

module.exports = router;
