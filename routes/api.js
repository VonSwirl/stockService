const express = require('express');
const router = express.Router();
//const Product = require('../models/stock');
const stockModel = require('../models/stock'); //Get db model to be able to find from

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

//Get a single item to be able to edit prices
router.post('/editProduct/:ean',function(req, res, next){
    //Get their current id and compare to check who they are then call another function
    stockModel.findOne({productEAN : req.params.ean}).then(function(products){
      res.render('historicalPrices', { product : products});
    });
  });
  
// stockModel.findById(req.params.ean, function(err, products){
//   if(err){
//     res.send(err);
//   }
//   console.log('Im here');
//   console.log(products);
// });


//Will get an order when the user has selected the items they want
router.post('/productorder', function(req, res, next){

  var order = [];
  for(var prop in req.body){ //Loops through the url params
    var number = req.body[prop][1];
    if(number > 0){ //This will filter out all of the ones where the number they want is not 0
      var ean = prop; //Set each of the different values of the items that have been selected
      var name = req.body[prop][2];
      var avaliableStock = req.body[prop][0];
      var enoughStock = (avaliableStock >= number) ? true : false;
      var price = req.body[prop][3];
      //Create an array of each item to be sent out
      order.push({"ean" : ean, "name" : name, "enoughStock" : enoughStock, "numberWanted" : number, "productPrice" : price });
    }
  }
  //Can pass on an order here though json?
  console.log("Here is an order:" , order);
  return;
});

//Add another product to database
// router.post('/products',function(req, res, next){
//   stockModel.create(req.body).then(function(product) { //Will create a new instance then save to db
//     res.send(product);
//   }).catch(next);
// });

//Update a product in database (use this for changing price)
router.put('/products/:id',function(req, res, next){
  stockModel.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    stockModel.findOne({_id: req.params.id}).then(function(product){
      res.send(product);
    });
  });
});

//Delete a product from database Still doesnt work well but is it needed?
router.delete('/products/:id',function(req, res, next){
  stockModel.findByIdAndRemove({_id:req.params.id}).then(function(product){
    res.send(product);
  });
  res.send({type:'DELETE'});

});

module.exports = router;
