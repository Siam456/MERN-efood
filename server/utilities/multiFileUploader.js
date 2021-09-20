const multer = require('multer');
const path = require('path');
const express = require('express')


const uploadPathAvater = '../public/userUpload'
const uploadPathMenu = '../public/menuUpload'


const storage = multer.diskStorage({
    destination: (req, file , cb) => {
        //cb(null, uploadPathAvater);
        //console.log(file);
        if(file.fieldname === 'avater'){
            //console.log(uploadPathAvater)
            cb(null, uploadPathAvater);
        } else if(file.fieldname === 'menu'){
            //console.log(uploadPathMenu)
            cb(null, uploadPathMenu);
        }
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
        if(file !== null){
            if(file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg" ){
                cb(null, true);
            } else{
                cb(new Error('only jpg, jpeg, png allowed'))
            }
        } else{
            cb(null, true);
        }
    }
})

module.exports = upload

