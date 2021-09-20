const { check, validationResult } = require('express-validator');
const people = require('../../model/userModel');
const shoprqModel = require('../../model/shopRqModel');
const createHttpError = require('http-errors');

const fs = require('fs');
const path = require('path');


const shoprqValidation = [
    check('name')
        .isLength({min: 1})
        .withMessage("Name is required")
        .isAlpha("en-US", {ignore: "-"})
        .withMessage('Name must not contain anything other than alphabet')
        .trim(),
    check('shopname')
        .isLength({min: 1})
        .withMessage("Shopname is required"),
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
        })
        .custom(async(value) => {
            try{
                const userEmail = await shoprqModel.find({email: value});
                if(userEmail.length !== 0){
                    throw createHttpError('Email is already in Prorcess');
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
        })
        .custom(async(value) => {
            try{
                const userPhone = await shoprqModel.find({phone: value});
                if(userPhone.length !== 0){
                    throw createHttpError('Phone Number is already in Prorcess');
                }
            } catch(err){
                throw createHttpError(err.message);
            }
        }), 
    check("password")   
        .isLength({min: 5})
        .withMessage('password must be at least 8 chars long'),
    check("address")   
        .isLength({min: 1})
        .withMessage('Address is required'),

]

const checkshoprqValidation = (req, res, next) => {
    
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
   
    //console.log(mappedErrors)
    if(Object.keys(mappedErrors).length === 0){
        next()
    } else{   
        //console.log(req.files.avater[0].filename)

        if(req.files.avater){
            //console.log(path.join(__dirname, '..' , '..' , '..', `public/userUpload/`))
            const delPath =path.join(__dirname, '..' , '..' , '..', `public/userUpload/${req.files.avater[0].filename}`)
            fs.unlinkSync(delPath);
            
        } 
        if(req.files.menu){
            //console.log(path.join(__dirname, '..' , '..' , '..', `public/userUpload/`))
            const delPath =path.join(__dirname, '..' , '..' , '..', `public/menuUpload/${req.files.menu[0].filename}`)
            fs.unlinkSync(delPath); 
        }

        res.status(500).json({
            errors: mappedErrors,
        })
        
        
    }
}

module.exports = { shoprqValidation , checkshoprqValidation  }