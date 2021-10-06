const express = require('express');


const route = express.Router();

//internal import
const checkLogin = require('../middleware/common/checkLogin')


const { getUser
        ,postUser,
        editUser,
        deleteUser,
        getSeller,
        getUserById
     } = require('../controller/userController');
const upload = require('../utilities/singleFileUpload');

const { userValidation , checkUserValidation , bodyParseData } = require('../middleware/user/userValidation');

const { editUserValidation , checkEditUserValidation ,bodyParseDataEdit } = require('../middleware/user/editUserValidator')



route.get('/', checkLogin, getUser);
route.post('/', upload.single('avater'), bodyParseData, userValidation, checkUserValidation, postUser);
route.put('/:id',checkLogin, upload.single('avater'), bodyParseDataEdit, editUserValidation, checkEditUserValidation, editUser);

route.post('/rq', upload.any(), bodyParseData, postUser);
route.delete('/:id',checkLogin, deleteUser);

route.get('/seller', getSeller);
route.get('/shop/:id', getUserById);





module.exports = route;