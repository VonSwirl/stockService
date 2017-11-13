
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
//var textValue = document.getElementById('textArea');
//Will do a post when button is pressed on the products page
router.get('/productorder', function(req, res, next){

  //Hi rob below is the order being put together 
  var order = [];
  for(var prop in req.query){
    var number = req.query[prop][1];

    if(number > 0){
      var ean = prop;
      var avaliableStock = req.query[prop][0];
      var enoughStock = (avaliableStock >= number) ? true : false;
      var name = req.query[prop][2];
      console.log('i should be adding ann order');
      order.push({"ean" : ean, "enoughStock" : enoughStock, "number" : number , "name" : name});
    }

  }

  //When you want to pass on the order the below object should be enough info :D 
  console.log("i should be ann order" , order);

  console.log(req.query['HG1']);
  // res.render('productView', {textArea: req.body.textArea});
   //var test = req.body.textArea;
   if(req.body.checkbox = 'on'){
     //console.log(req.body.textArea);
   };
   console.log('button pressed');
  // console.log(req.body.textArea);
   //console.log(req.body.checkbox);
//   console.log(textArea);
// //  let stockModel = new stockModel();
  //stockModel.title
//  console.log(req.body.title);
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
