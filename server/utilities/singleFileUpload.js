const multer = require('multer');
const path = require('path');
const express = require('express');
const createHttpError = require('create-error');


const uploadPath = '../public/userUpload'


const storage = multer.diskStorage({
    destination: (req, file , cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname
                            .replace(fileExt, "")
                            .toLocaleLowerCase()
                            .split(" ")
                            .join("-") + "-" + Date.now();

        cb(null, fileName + fileExt);
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 5000000,
    },
    fileFilter: (req, file, cb) => {
        if(file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ){
            cb(null, true);
        } else{
            cb(new createHttpError('only jpg, jpeg, png allowed'))
        }
    }
})

module.exports = upload

