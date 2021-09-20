const { check, validationResult } = require('express-validator');
const people = require('../../model/userModel')
const createHttpError = require('http-errors');

const fs = require('fs');
const path = require('path');

const bodyParseDataEdit = (req, res, next) => {
    const body = JSON.parse(req.body.user);
    
    req.body = body;
    //console.log(req.body);
    next();
}
//console.log(data);


const editUserValidation = [
    check('name')
        .isLength({min: 1})
        .withMessage("Name is required")
        .isAlpha("en-US", {ignore: "-"})
        .withMessage('Name must not contain anything other than alphabet')
        .trim(),
    check("email")
        .isEmail()
        .withMessage("Invalid emaail address")
        .trim(),
    check("phone")
        .isMobilePhone('bn-BD')
        .withMessage("'Enter a Bangladeshi mobile number")
        .trim() 
]

const checkEditUserValidation = (req, res, next) => {
    
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    console.log(mappedErrors)
    if(Object.keys(mappedErrors).length === 0){
        next()
    } else{
        //console.log(mappedErrors)
        if(req.file){
            const delPath = path.join(__dirname, '..' , '..' , '..', `public/userUpload/${req.file.filename}`);
            fs.unlinkSync(delPath);
            res.status(500).json({
                errors: mappedErrors,
            })
            
        } else{
            res.status(500).json({
                errors: mappedErrors,
            })
        }
        
        
    }
}

module.exports = { editUserValidation , checkEditUserValidation ,bodyParseDataEdit }