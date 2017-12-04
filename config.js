
//config.OrderServiceURL = 'http://localhost:3004/order/makeorder'
//config.OrderServiceURL = 'http://3amigoso.azurewebsites.net/order/makeorder'

var development = {

    'orderServiceURL': "http://3amigoso.azurewebsites.net/order/makeorder",
    'secret': 'jwtsecret'
}

var test = {

    'orderServiceURL': "http://3amigoso.azurewebsites.net/order/makeorder",
    'secret': 'jwtsecret'
}

var standard = {

    'orderServiceURL': "http://3amigoso.azurewebsites.net/order/makeorder",
    'secret': 'jwtsecret'
}

var config = function () {

    switch (process.env.NODE_ENV) {

        case 'development':
            return development;

        case 'standard':
            return standard;

        default:
            return development;
    }
}

module.exports = config();
