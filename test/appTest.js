const assert = require('chai').assert;
const expect = require('chai').expect;
const app = require('../routes/api');

const editProduct = require('../services/editProduct');
const productCommunication = require('../services/productCommunication');

//Results

describe('editProduct', function(done){
    it('Upadating product price should have only a number being passed to it', function(done){
        var priceTest = 1 //This will be what the price is
        editProduct.updateProductPrice(priceTest);
        done();
    });
    it('Upadating product price shouldnt allow for string', function(done){
        var priceTest = "test" //This will be what the price is
        editProduct.updateProductPrice(priceTest);
        done();
    });
 
    // it('Should find a single product, will check against ean', function(){
    //     assert.typeOf(x, 'string');
    // });
    // it('Updating a product price should only be a number passed', function(){
    //     assert.typeOf(x, 'number');
    // });  
});

Describe('productCommunication', function(){
    it('Should recieve data and update or put into database', function(){
        var testData = {
            "ean": "Test",
            "name": "Test Name",
            "description": "Test description",
            "brand": "Test Brand",
            "numberRequired": "2" 
        }

        

    });
 });