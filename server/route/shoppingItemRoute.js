const express = require('express');

const route = express.Router();

//internal import
const checkLogin = require('../middleware/common/checkLogin')


const {
    getshoppingItem,
    postshoppingItem,
    editshoppingItemStatus,
    deleteshoppingItem,
    getshoppingItemShopkeeper,
    postDirect,
    postshoppingItemArray
} = require('../controller/shoppingItemController');


route.get('/', checkLogin, getshoppingItem);
route.get('/shop', checkLogin, getshoppingItemShopkeeper);
route.post('/:cartId', checkLogin, postshoppingItem);
route.post('/:selerId/:productId', checkLogin, postDirect);

route.put('/:id',checkLogin, editshoppingItemStatus);

route.patch('/arraypost', checkLogin, postshoppingItemArray);
route.delete('/:id',checkLogin, deleteshoppingItem);


module.exports = route;