const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
//import model
const people = require('../model/userModel');
const productModel = require('../model/productModel');
const cardModell = require('../model/cartModel');
const shoppingItemModel = require('../model/shoppingItemModel');


const getProduct = async (req, res) => {
    try{
        //console.log(req.user)
        const products = await productModel.find({'sellerA.id': req.user._id})
        .sort({views: -1});
        if(products){
            res.json({
                products,
            });
        } else{
            res.status(404).json({
                errors: {
                    msg: 'not available',
                }
            })
        }

    } catch(err){
        console.log(err.message);
    }
}

const getAllProduct = async (req, res) => {
    try{
        //console.log(req.user)
        const products = await productModel.find({})
        .sort({views: -1});
        if(products){
            res.json({
                products,
            });
        } else{
            res.status(404).json({
                errors: {
                    msg: 'not available',
                }
            })
        }

    } catch(err){
        console.log(err.message);
    }
}

const postProduct = async (req, res) => {
    try{
        console.log(req.file);
        
        if(req.file){
            const product = new productModel({
                ...req.body,
                sellerA: {
                    id: req.user._id,
                    name: req.user.name,
                    email: req.user.email,
                    phone: req.user.phone,
                    shopname: req.user.shopname,
                    address: req.user.address,
                },
                avater: req.file.filename,
            });
    
            const response = await product.save();

            await people.updateOne({_id: req.user._id},
                {
                    $push: {
                        products: response._id,
                    }
                })

            res.json({
                msg: 'user added successfully',
            });
        } else{
            const product = new productModel({
                ...req.body,
                sellerA: {
                    id: req.user._id,
                    name: req.user.name,
                    email: req.user.email,
                    phone: req.user.phone,
                    shopname: req.user.shopname,
                    address: req.user.address,
                },
            });
    
            const response = await product.save();

            await people.updateOne({_id: req.user._id},
                {
                    $push: {
                        products: response._id,
                    }
                })
            res.json({
                msg: 'product added successfully',
            });
        }
        

    } catch(err){
        console.log(err.message)
    }
}

const editProduct = async (req, res) => {
    try{
        //console.log(req.body)
        console.log(req.params.id)
        if(req.file){
            const response = await productModel.findByIdAndUpdate({_id: req.params.id},
                {
                    $set: {
                        title: req.body.title,
                        description: req.body.description,
                        price: req.body.price,
                        avater: req.file.filename
                    }
                });
                const delPath = path.join(__dirname, '..' , '..' , `public/productAvater/${response.avater}`)
                fs.unlinkSync(delPath);
                res.json({
                    user: response,
                    msg: 'user Update successfully',
                })


        } else{
            const response = await productModel.findByIdAndUpdate({_id: req.params.id},
                {
                    $set: {
                        title: req.body.title,
                        description: req.body.description,
                        price: req.body.price,
                    }
                });
                res.json({
                    user: response,
                    msg: 'user Update successfully',
                })

        }
            

    } catch(err){
        console.log(err.message)
    }
}


const deleteProduct = async (req, res) => {
    try{
        
        //console.log(shoppingItem[0].products);
        const response = await productModel.findByIdAndDelete({_id: req.params.id});

        console.log(response._id)
        

        if(response.avater){
            const delPath = path.join(__dirname, '..' , '..' , `public/productAvater/${response.avater}`)
            fs.unlinkSync(delPath);
        }
        res.json({
            user: response,
            msg: 'user delete successfully',
        })

    }  catch(err){
        
        console.log(err.message)
    }
}

const incCount = async (req, res) => {
    try{
        //console.log(req.body)
        //console.log(req.params.id)
        
            const response = await productModel.findByIdAndUpdate({_id: req.params.id},
                {
                    $inc: { views: 1, "metrics.orders": 1 }
                });
                res.json({
                    user: response,
                    msg: 'user Update successfully',
                })
        
            

    } catch(err){
        console.log(err.message)
    }

}

const updateFeature = async (req, res) => {
    try{
        //console.log(req.body)
        //console.log(req.params.id)
        
            const response = await productModel.findByIdAndUpdate({_id: req.params.id},
                {
                    $set: { 
                        'feature': 'true'
                    }
                });
                res.json({
                    user: response,
                    msg: 'feature product',
                })
        
            

    } catch(err){
        console.log(err.message)
    }

}


module.exports = {
    getProduct,
    postProduct,
    editProduct,
    deleteProduct,
    incCount,
    updateFeature,
    getAllProduct
}