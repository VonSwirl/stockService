const assert = require('chai').assert;
const app = require('../routes/api');

//Results
sayHelloResult = app.t();

describe('Api', function(){
    it('SayHello should return hello', function(){
        assert.equal(sayHelloResult, 'hello');
    });

    it('SayHello should return string', function(){
        assert.typeOf(sayHelloResult, 'string');
    });
    
});

