const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
//import model
const people = require('../model/userModel');
const shoopingItemModel = require('../model/shoppingItemModel');
const cartModel = require('../model/cartModel');
const ProductModel = require('../model/productModel')


const getDelivery = async (req, res) => {
    
    try{
        // console.log(req.user)
        // req.user.status = 'busy'
        // console.log(req.user)
        const item = await shoopingItemModel.find({
            $and: [
                {'user.address': req.user.address},
                {$or: [
                    {status: 'pickup'},
                    {status: 'On delivery'},
                    {status: 'Deliverd'}
                ]}
            ]
        }).populate('products').sort({createdAt: -1})
        
        if(item){
            res.json({
                shoppingItem: item,
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

const getMyDelivery = async (req, res) => {
    
    try{
        // console.log(req.user)
        // req.user.status = 'busy'
        // console.log(req.user)
        const item = await shoopingItemModel.find({
            $and: [
                {'rider.id': req.user._id},
                {$or: [
                    {status: 'On delivery'},
                    {status: 'Deliverd'}
                ]}
            ]
        }).populate('products').sort({createdAt: -1})


        if(item){
            res.json({
                shoppingItem: item,
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

const getDeliveryShopkeeper = async (req, res) => {
    //console.log(req.params.id)
    
    try{
        const users = await shoopingItemModel.find({selerId: req.user._id}).populate('products');
        console.log(req.user._id)
        if(users){
            res.json({
                shoppingItem: users,
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

const postDelivery = async (req, res) => {
    try{
        

        const response = await cartModel.findByIdAndDelete({_id: req.params.cartId})
        .select({_id: 0})
        //console.log(response)

        const shoppingItem = new shoopingItemModel({
            user: response.user,
            products: response.products,
            quantity: response.quantity,
            totalPrice: response.totalPrice,
            selerId: response.selerId,
        })
        const items = shoppingItem.save();
        res.json({
            items,
        });

    } catch(err){
        console.log(err.message)
    }
}



const editshoppingItemStatus = async (req, res) => {
    //console.log(req.body)
    try{
        const user = await people.findOne({_id: req.user._id})
        //console.log(user.name)
        const item = await shoopingItemModel.findOne({_id: req.params.id});
        if(user.status === 'busy' && req.body.status === 'On delivery'){
            res.status(500).json({
                msg: 'Complete previous delivary first',
            }) 
            
        } else if(item.status === 'Deliverd' && req.body.status === 'On delivery'){
            res.status(500).json({
                msg: 'already delivered',
            }) 
        }else if(item.status === 'On delivery' && req.body.status === 'On delivery'){
            res.status(500).json({
                msg: 'already in process',
            })
        } else if(item.status === 'Deliverd' && req.body.status === 'Deliverd'){
            res.status(500).json({
                msg: 'already delivered',
            })
        }
        

        else if(user.status === 'free' && req.body.status === 'On delivery'){
            //console.log('user')
            const response = await shoopingItemModel.findByIdAndUpdate({_id: req.params.id},
                {
                    $set: {
                        status: req.body.status,
                        rider: {
                            id: req.user._id,
                            name: req.user.name,
                            email: req.user.email,
                            phone: req.user.phone,
                            address: req.user.address
                        }
                    }
                });
            const user = await people.findByIdAndUpdate({_id: req.user._id},
                {$set: {
                    status: 'busy'
            }})
            
                
                res.json({
                    user: response,
                    msg: 'user Update successfully',
                })
        } else if(item.rider.id.toString() === req.user._id && user.status === 'busy' && req.body.status === 'Deliverd'){
            const response = await shoopingItemModel.findByIdAndUpdate({_id: req.params.id},
                {
                    $set: {
                        status: req.body.status,
                    }
                });
            const user = await people.findByIdAndUpdate({_id: req.user._id},
                {$set: {
                    status: 'free'
            }})
            //console.log('siam')
            res.json({
                msg: 'delivery done',
            })
        } else{
            //console.log('siam')
            res.status(501).json({
                msg: 'error',
            })
        }

        } catch(err){
        console.log(err.message)
    }
    
}



module.exports = {
    getDelivery,
    postDelivery,
    editshoppingItemStatus,
    getDeliveryShopkeeper,
    getMyDelivery
}