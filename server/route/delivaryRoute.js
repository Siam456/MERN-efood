const express = require('express');

const route = express.Router();

//internal import
const checkLogin = require('../middleware/common/checkLogin')


const {
    getDelivery,
    editshoppingItemStatus,
    getMyDelivery
} = require('../controller/deliveryController');


route.get('/', checkLogin, getDelivery);

route.get('/mydelivery', checkLogin, getMyDelivery);
// route.get('/shop', checkLogin, getshoppingItemShopkeeper);
// route.post('/:cartId', checkLogin, postshoppingItem);
// route.post('/:selerId/:productId', checkLogin, postDirect);

route.put('/:id',checkLogin, editshoppingItemStatus);


// route.delete('/:id',checkLogin, deleteshoppingItem);


module.exports = route;