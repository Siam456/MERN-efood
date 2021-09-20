const { check, validationResult } = require('express-validator');
const people = require('../../model/userModel')
const createHttpError = require('http-errors');

const fs = require('fs');
const path = require('path');

const bodyParseData = (req, res, next) => {
    const body = JSON.parse(req.body.user);
    
    req.body = body;
    //console.log(req.body);
    next();
}
//console.log(data);


const userValidation = [
    check('name')
        .isLength({min: 1})
        .withMessage("Name is required")
        .isAlpha("en-US", {ignore: "-"})
        .withMessage('Name must not contain anything other than alphabet')
        .trim(),
    check("email")
        .isEmail()
        .withMessage("Invalid emaail address")
        .trim()
        .custom(async(value) => {
            try{
                const userEmail = await people.find({email: value});
                if(userEmail.length !== 0){
                    throw createHttpError('Email is already in used');
                }
            } catch(err){
                throw createHttpError(err.message);
            }
        }),
    check("phone")
        .isMobilePhone('bn-BD')
        .withMessage("'Enter a Bangladeshi mobile number")
        .trim()
        .custom(async(value) => {
            try{
                const userPhone = await people.find({phone: value});
                if(userPhone.length !== 0){
                    throw createHttpError('Phone Number is already in used');
                }
            } catch(err){
                throw createHttpError(err.message);
            }
        }), 
    check("password")   
        .isLength({min: 5})
        .withMessage('password must be at least 8 chars long'),
]

const checkUserValidation = (req, res, next) => {
    
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    //console.log(mappedErrors)
    if(Object.keys(mappedErrors).length === 0){
        next()
    } else{
        
        if(req.file){
            console.log(path.join(__dirname, '..' , '..' , '..', `public/userUpload/`))
            const delPath =path.join(__dirname, '..' , '..' , '..', `public/userUpload/${req.file.filename}`)
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

module.exports = { userValidation , checkUserValidation ,bodyParseData }