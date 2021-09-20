const express = require('express');
const multer = require('multer');

const route = express.Router();

//internal inport
const checklogin = require('../middleware/common/checkLogin');
const { getRiderRq, postRiderRq, deleteRiderRq } =
            require('../controller/riderRqController');

//dummy
const upload = require('../utilities/singleFileUpload');
const { RiderValidation , checkRiderValidation ,bodyParseData } = require('../middleware/rider/riderValidator')


route.get('/', checklogin, getRiderRq);
route.post('/', upload.single('avater'),  bodyParseData, RiderValidation, checkRiderValidation, postRiderRq);



route.delete('/:id', checklogin, deleteRiderRq);

module.exports = route;

