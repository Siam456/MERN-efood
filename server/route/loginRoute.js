const express = require('express');
const route = express.Router();

const {login,loginPost} = require('../controller/loginController')

route.get('/', login);
route.post('/', loginPost);

module.exports = route;