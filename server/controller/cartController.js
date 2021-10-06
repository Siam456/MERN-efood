const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
//import model
//const people = require('../model/userModel');
const cartModel = require('../model/cartModel');
const productModel = require('../model/productModel')


const getCart = async (req, res) => {
    
    try{
        const users = await cartModel.find({'user.id': req.user._id}).populate('products')
        if(users){
            res.json({
                cart: users,
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

const postCart = async (req, res) => {
    console.log(req.params.selerId);
    try{
        let response;
        const users = await cartModel.find({
            $and: [
                {'user.id': req.user._id},
                {'products': req.params.productId}
            ]
        })
        //console.log(users.length)
        if(users.length>0){
            //response = await cartModel.findByIdAndUpdate({})
            //console.log(users[0]._id)
            response = await cartModel.findByIdAndUpdate({_id: users[0]._id}, {
                $set: {
                    quantity: req.body.quantity,
                    totalPrice: req.body.totalPrice,
                }
            })
        } else{
            const cart = new cartModel({
                ...req.body,
                selerId: req.params.selerId,
                products: req.params.productId,
                user: {
                    id: req.user._id,
                    name: req.user.name,
                    email: req.user.email,
                    phone: req.user.phone,
                    address: req.user.address,
                    
                },
                
                
            });
    
            response = await cart.save();
        }
        
        res.json({
             response,
        });

    } catch(err){
        console.log(err.message)
    }
}

const editCart = async (req, res) => {
    
    try{
        //console.log(req.body.status)
        
        const users = await cartModel.find({
            $and: [
                {'user.id': req.user._id},
                {'products': req.params.id}
            ]
        }).populate('products')

        let response;

        if(req.body.status === 'add'){
            if(users.length > 0){
                const subtotalPrice = users[0].totalPrice;
                const price = users[0].products.price;

                const total = subtotalPrice+price;
                //const totalMinus = subtotalPrice-price;

                //console.log(users[0].quantity)
                const quan = users[0].quantity;
                const quanAdd = quan + 1;
                //const quanRemove = quan - 1;
                response = await cartModel.findByIdAndUpdate({_id: users[0]._id}, 
                    {$set: {'totalPrice': total, quantity: quanAdd}})
    
                
            } else{
                
                const product = await productModel.find({_id: req.params.id})
                
                const cart = new cartModel({
                    selerId: product[0].sellerA.id,
                    products: req.params.id,
                    user: {
                        id: req.user._id,
                        name: req.user.name,
                        email: req.user.email,
                        phone: req.user.phone,
                        address: req.user.address,
                        
                    },
                    totalPrice: product[0].price,
                    quantity: 1,
                });

                response = await cart.save();
                
            }
        } else if(req.body.status === 'remove'){
            if(users.length > 0){
                const subtotalPrice = users[0].totalPrice;
                const price = users[0].products.price;

                //const total = subtotalPrice+price;
                const totalMinus = subtotalPrice-price;

                //console.log(users[0].quantity)
                const quan = users[0].quantity;
                //const quanAdd = quan + 1;
                const quanRemove = quan - 1;
                response = await cartModel.findByIdAndUpdate({_id: users[0]._id}, 
                    {$set: {'totalPrice': totalMinus, quantity: quanRemove}})
    
                
            }
        }

        res.json({
            response
        })
         
        
    } catch(err){
        console.log(err.message)
        res.status(500).json({
            err: err.message,
        })
    }
}


const deleteCart = async (req, res) => {
    try{
        const response = await cartModel.findByIdAndDelete({_id: req.params.id});
        
        res.json({
            user: response,
            msg: 'cart delete successfully',
        })

    }  catch(err){
        console.log(err.message)
    }
}


module.exports = {
    getCart,
    postCart,
    editCart,
    deleteCart
}