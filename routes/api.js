const express = require('express');
const router = express.Router();
const stockModel = require('../models/stock'); //Get db model to be able to find from
const config = require('../config.js');
const request = require('request');
//This will need to be changed to check for whos logged in so can check what they can see

const editProduct = require('../services/editProduct');
const productCommunication = require('../services/productCommunication');
//Get all of the products from the DB

router.get('/products', function (req, res, next) {

  stockModel.find({}, function (err, products) {
    if (err) {
      res.send(err);
    }
    //send a list of the products through to the front end
    res.render('productView', { productList: products });
  });
});

//Get a single item to be able to edit prices
router.post('/editProduct/:ean', function (req, res, next) {
  var ean = req.params.ean;
  editProduct.getProduct(ean).then(function (products) {
    res.render('historicalPrices', { product: products });
  }).catch(next);
});

//Will get an order when the user has selected the items they want
router.post('/productorder', function (req, res, next) {

  productCommunication.sendOrder(req).then(function (orderSent) {
    if (orderSent) {
      console.log('Order has been sent');
      res.status(200)
      res.redirect('/api/products');
    }
  }).catch(next);
});

// Will handle new data passed from purchasing survice
router.post('/newproducts', function (req, res, next) {

  productCommunication.newProduct(req).then(function (newProductAdded) {
    if (newProductAdded) {
      console.log('Product has been added or updated');
      res.status(200);
    }
  }).catch(next);
});

//Update a product price in the database
router.post('/sentPrice', function (req, res, next) {

  editProduct.updateProductPrice(req).then(function (priceUpdated) {
    if (priceUpdated) {
      res.status(200);
      res.redirect('/api/products'); //Redirect to the home page
    }
  }).catch(next);
});

module.exports = router;


