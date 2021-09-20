const express = require('express');
const multer = require('multer');

const route = express.Router();

//internal inport
const checklogin = require('../middleware/common/checkLogin');
const { getProduct, postProduct, editProduct, deleteProduct, incCount, updateFeature
,getAllProduct } =
            require('../controller/productController');

//dummy
const upload = require('../utilities/productAvaterUpload');
const { ProductValidation , checkProductValidation ,bodyParseData } = require('../middleware/product/productValidation');


const checkProductController = (req, res, next) => {
    if(req.user.role === 'admin' || req.user.role === 'seller'){
        next()
    } else{
        res.statue(404).json({
            msg: 'muri khao'
        })
    }
}

const checkadmin = (req, res, next) => {
    if(req.user.role === 'admin'){
        next()
    } else{
        res.statue(404).json({
            msg: 'muri khao'
        })
    }
}

route.get('/', checklogin, getProduct);
route.get('/all', getAllProduct);
route.post('/',checklogin, checkProductController, upload.single('avater'),  bodyParseData,ProductValidation , checkProductValidation, postProduct);

route.put('/:id', checklogin, checkProductController, upload.single('avater'),  bodyParseData,ProductValidation , checkProductValidation, editProduct);

route.delete('/:id', checklogin, checkProductController, deleteProduct); //deleteProduct

route.patch('/:count/:id', incCount);

route.patch('/f/f/:id', checklogin, checkadmin, updateFeature);

module.exports = route;

