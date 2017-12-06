const stockModel = require('../models/stock');

/**
 * @description This will get the product and display the editing page
 * @param {String} ean 
 */
function getProduct(ean) {
  return new Promise(function (resolve, reject) {
    if (ean != null) {
      stockModel.findOne({ productEAN: ean }).then(function (products) {
        resolve(products);

      }).catch(function (err) {
        reject('Error trying to get product - ' + err);
      });
    }
  });
}

/**
 * @description This will update the price of a product
 * @param {Request} req 
 */
function updateProductPrice(req) {
  return new Promise(function (resolve, reject) {
    for (var prop in req.body) { //Loops through the url params
      var number = req.body[prop];
    }
    if (number > 0) {
      stockModel.update({ productEAN: prop }, //Compare ean passed in to get correct product
        {
          $set: { productPrice: number, }, //Set the product price
          $push: { historicalPrice: number } // Push the product price into historical items array
        }, 
        {
          multi: true
        },
        function (err, docs) { //Error checking and status returns
          if (err) {
            reject(err);
          } else {
            console.log('Price updated', docs);
            resolve(true); //If true can be checked against in the post request
          }
        }
      )
    };
  }).catch(function (err) { //More error catching
    reject('Error trying to update product - ' + err);
  });
}

module.exports = { getProduct, updateProductPrice };
