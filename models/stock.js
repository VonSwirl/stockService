const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('debug', true);

//Create stock schema and model
const ProductSchema = new Schema({

    //Will keep these as objects incase new fields need to be added
    productEAN: {
      type: String,
      required: [true, 'Product EAN field is requried']
    },
    productName: {
      type: String
      //required: [true, 'Name field is requried']
    },
    productDescription: {
      type: String
    },
    productPrice: {
      type: Number,
      default: 9999
    },
    productBrand: {
      type: String
    },
    //Add in a product Brand
    productAvailability: {
      type: String,
      default: 'NotSet'
    },
    availableStock: { //Will this be required etc?
      type: Number
    },
    warehouseStock: { //Will this be required etc?
      type: Number
    },
    historicalPrice: {
      type: [Number] //Store an array of numbers
    }
});

//Set a model
const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
