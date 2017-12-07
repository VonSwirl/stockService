const assert = require('chai').assert;
const app = require('../routes/api');

const editProduct = require('../services/editProduct');
const productCommunication = require('../services/productCommunication');

//Results
var random = Math.random(100);


describe('editProduct', function(){
    it('Get product should have only a number being passed to it', function(){
        assert.typeOf(x, 'number');
    });
 
    it('Should find a single product, will check against ean', function(){
        assert.typeOf(x, 'string');
    });
    it('Updating a product price should only be a number passed', function(){
        assert.typeOf(x, 'number');
    });
    
});
