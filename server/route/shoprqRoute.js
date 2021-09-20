const express = require('express');
const multer = require('multer');

const route = express.Router();

//internal inport
const { getShopRq, postShoprq ,deleteShoprq } = require('../controller/shoprqController');
const checklogin = require('../middleware/common/checkLogin');
const { shoprqValidation , checkshoprqValidation  } = require('../middleware/seller/shopRqvalidator');

//dummy
const upload = require('../utilities/multiFileUploader');

const shoprqdata = (req,res,next) => {
    const data = req.body.user;
    const body = JSON.parse(data)
    req.body= body;
    next();
}

route.get('/', checklogin, getShopRq);

// route.post('/', upload.fields([
//     {name:'avater', maxCount: 1},
//     {name: 'menu', maxCount: 1}
// ]),  (req, res) => {
//     console.log(req.body)
// });

const up = multer();

route.post('/', upload.fields([
    {name:'avater', maxCount: 1},
    {name: 'menu', maxCount: 1}
])
, shoprqdata, shoprqValidation, checkshoprqValidation, postShoprq);

route.delete('/:id', checklogin, deleteShoprq);

module.exports = route;

