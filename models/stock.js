const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create stock schema and model
const ProductSchema = new Schema({

    //Will keep these as objects incase new fields need to be added
    productID: {
      type: Number,
      required: [true, 'Product ID field is requried']
    },
    productName: {
      type: String
      //required: [true, 'Name field is requried']
    },
    productDescription: {
      type: String
    }

});

    // productCategory: { //Could this be a number?
    //   type: String
    // },
    // productAvailability: {
    //   type: String
    // },
    // productStockLevel: { //Will this be required etc?
    //   type: String
    // },
    // productBarcode: {
    //   type: String
    // }

    //NEED product historical price

//Set a model
const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
