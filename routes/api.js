
const express = require('express');
const router = express.Router();
//const Product = require('../models/stock');
const stockModel = require('../models/stock'); //Get db model to be able to find from
const config = require('../config.js');
const request = require('request');
//This will need to be changed to check for whos logged in so can check what they can see
//Do this in the front end?

//Get all of the products from the DB
router.get('/products',function(req, res, next){
  stockModel.find({}, function(err, products){
    if(err){
      res.send(err);
    }
    //send a list of the products through to the front end
    res.render('productView', {productList : products});
  });
});
//test

//Get a single item to be able to edit prices
router.post('/editProduct/:ean',function(req, res, next){
    //Get their current id and compare to check who they are then call another function
    stockModel.findOne({productEAN : req.params.ean}).then(function(products){
      res.render('historicalPrices', { product : products});
    });
  });

//Will get an order when the user has selected the items they want
router.post('/productorder', function(req, res, next){

  var order = [];
  for(var prop in req.body){ //Loops through the bodys items
    var number = req.body[prop][1];
    if(number > 0){ //This will filter out all of the ones where the number they want is not 0
      var ean = prop; //Set each of the different values of the items that have been selected
      var name = req.body[prop][2];
      var avaliableStock = req.body[prop][0];
      var enoughStock = (avaliableStock >= number) ? true : false;
      var price = req.body[prop][3];
      var customerRef = "123";
      //Create an array of each item to be sent out
      order.push({"ean" : ean, "name" : name, "enoughStock" : enoughStock, "numberWanted" : number, "productPrice" : price, "customerRef" : customerRef });
    }
  }
  //Can pass on an order here though json?
  console.log("Here is an order:" , order);


  //// USE THIS TO COMMUNICATE TO ORDER SERVICE
   try{
    request.post({
        url : config.OrderServiceURL, //Can post but needs url
        body: order,
        json: true
    }, function(err, res, body){
      if(err){
        console.log('There was an error', err);
        //console.log(res);
      }
    })
   }catch(err){
    console.log('error with letting order service know we have update', err);
   }

  console.log("IM HERE"); 
  res.send('Order Sent');
  
});

// Will handle new data passed from purchasing survice
router.post('/newproducts',function(req, res, next){

    stockModel.findOneAndUpdate ({productEAN : req.body.ean}, //Compare the EAN passed in
      { $inc: { availableStock : req.body.numberRequired, warehouseStock : req.body.numberRequired }, //Update the new product if it exists
        $set: { productName : req.body.name, productDescription : req.body.description, productBrand : req.body.brand }
      },
      { upsert : true, new : true, setDefaultsOnInsert : true}, //Otherwise create a new one and set defaults
     
      function (err,docs) { //Error checking and status returns
        if(err){
          console.log('There was an error in the update' , err);
        }else{
          console.log('Product updated or added',docs);
          res.status(200);
          res.send('Congrats!');
        }
    });
});


//Update a product price in the database
router.post('/sentPrice',function(req, res, next){

  for(var prop in req.body){ //Loops through the url params
    var number = req.body[prop];}
    if(number > 0){
    stockModel.update({productEAN : prop}, //Compare ean passed in to get correct product
    {$set: { productPrice: number, }, //Set the product price
     $push: {historicalPrice : number}}, // Push the product price into historical items array
     {
       multi: true
     },

  function (err,docs) { //Error checking and status returns
    if(err){
      console.log('There was an error in the update' , err);
    }else{
      console.log('Price updated',docs);
      res.status(200);
      res.redirect('/api/products'); //Redirect to the home page
    }

  });
}
else{
  console.log('cant enter a value less than 0');
}});

module.exports = router;
