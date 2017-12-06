const stockModel = require('../models/stock');
const request = require('request');
const config = require('../config.js');
/**
 * @description This will handle the passing in of new products or updated stock
 * @param {JSON} req This is request body holding the new product data
 */
function newProduct(req) {
  return new Promise(function (resolve, reject) {

    stockModel.findOneAndUpdate({ productEAN: req.body.ean }, //Compare the EAN passed in
      {
        $inc: { availableStock: req.body.numberRequired, warehouseStock: req.body.numberRequired }, //Update the new product if it exists. Inc stock values
        $set: { productName: req.body.name, productDescription: req.body.description, productBrand: req.body.brand }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }, //Otherwise create a new one and set defaults

      function (err, docs) { //Error checking and status returns
        if (err) {
          console.log('There was an error in the update', err);
        } else {
          console.log('Product updated or added', docs);
          resolve(true);
        }
      });

  }).catch(function (err) {
    reject('Error trying adding a new product - ' + err);
  });
}
/**
 * @description Will create and send an order to the order service
 * @param {JSON} req This is the request body
 */
function sendOrder(req) {

  return new Promise(function (resolve, reject) {

    var order = [];
    var customerRef = "test@test.com";
    for (var prop in req.body) { //Loops through the bodys items
      var number = req.body[prop][2];
      if (number > 0) { //This will filter out all of the ones where the number they want is not 0
        var ean = prop; //Set each of the different values of the items that have been selected
        var name = req.body[prop][3];
        var availableStock = req.body[prop][0];
        var warehouseStock = req.body[prop][1];
        var price = req.body[prop][4];

        stockModel.update({ productEAN: prop }, //Compare ean passed in to get correct product
          { $set: { availableStock: availableStock - number, } }, //Set the product price
          {
            multi: true
          },
          function (err, docs) { //Error checking and status returns
            if (err) {
              console.log('There was an error in the update', err);
            }
          });

        //Push an array of each item to be sent out
        order.push({ "ean": ean, "name": name, "qtyReq": number, "stockQty": warehouseStock, "productPrice": price, "custoRef": customerRef });
      }
    }
    //Pass an order to order service
    var pOrder = { products: order }; //In this format so order service is able to handle and add to db
    console.log("Here is an order:", pOrder);
    
    sendTo(pOrder); //Used to communicate with order service
    resolve(true);

  }).catch(function (err) {
    reject('Error trying adding a new product - ' + err);
  });
}

/**
 * @description Send an order to order service
 * @param {Array} pOrder 
 */
function sendTo(pOrder) {
  try {
    request.post({
      url: config.orderServiceURL,
      body: pOrder,
      json: true
    }, function (err, res, body) {
      if (err) {
        console.log('There was an error', err);
      }
    })
  } catch (err) {
    console.log('Error with letting order service know we have update', err);
  }
}

module.exports = { newProduct, sendOrder };