
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

//Fine a single item, this can be used when staff click to edit the historical price
//Have an edit button on each of the rows
router.get('/products/:id',function(req, res, next){
    //Get their current id and compare to check who they are then call another function
    stockModel.findOne({_id: req.params.id}).then(function(product){
      res.send(product);
    });
});

router.get('/productorder', function(req, res, next){

  var order = [];
  for(var prop in req.query){ //Loops through the url params
    var number = req.query[prop][1];
    if(number > 0){ //This will filter out all of the ones where the number they want is not 0
      var ean = prop; //Set each of the different values of the items that have been selected
      var name = req.query[prop][2];
      var avaliableStock = req.query[prop][0];
      var enoughStock = (avaliableStock >= number) ? true : false;
      var price = req.query[prop][3];
      //Create an array of each item to be sent out
      order.push({"ean" : ean, "name" : name, "enoughStock" : enoughStock, "numberWanted" : number, "productPrice" : price });
    }
  }
  //Can pass on an order here though json?
  console.log("Here is an order:" , order);
  //console.log(req.query['HG1']);
  return;
});

//Will do a post when button is pressed on the products page
// router.post('/products', function(req, res, next){
//    if(req.body.checkbox = 'on'){
//      console.log(req.body.textArea);
//    };
//    console.log('button pressed');
//   return;
// });

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
