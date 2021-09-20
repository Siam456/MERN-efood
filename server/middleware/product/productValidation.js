const { check, validationResult } = require('express-validator');
const people = require('../../model/userModel');
const createHttpError = require('http-errors');
const riderRqModel = require('../../model/riderRqModel')

const fs = require('fs');
const path = require('path');

const bodyParseData = (req, res, next) => {
    const body = JSON.parse(req.body.user);
    
    req.body = body;
    //console.log(req.body);
    next();
}
//console.log(data);


const ProductValidation = [
    check('title')
        .isLength({min: 1})
        .withMessage("Title is required"),
    check("description")
        .isLength({min: 1})
        .withMessage("Description is required"),
    check("price")
        .isInt({ min: 1 })
        .withMessage("Price is required"),
]

const checkProductValidation = (req, res, next) => {
    
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    //console.log(mappedErrors)
    if(Object.keys(mappedErrors).length === 0){
        next()
    } else{
        
        if(req.file){
            console.log(path.join(__dirname, '..' , '..' , '..', `public/productAvater/`))
            const delPath =path.join(__dirname, '..' , '..' , '..', `public/productAvater/${req.file.filename}`)
            fs.unlinkSync(delPath);
            
            
        } 
            res.status(500).json({
                errors: mappedErrors,
            })
        
    }
}

module.exports = { ProductValidation , checkProductValidation ,bodyParseData }