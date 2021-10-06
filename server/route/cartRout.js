const express = require('express');

const route = express.Router();

//internal import
const checkLogin = require('../middleware/common/checkLogin')


const {
    getCart,
    postCart,
    editCart,
    deleteCart
} = require('../controller/cartController');


route.get('/', checkLogin, getCart);
route.post('/:selerId/:productId', checkLogin, postCart);
route.put('/:id/:shopid',checkLogin, editCart);


route.delete('/:id',checkLogin, deleteCart);


module.exports = route;