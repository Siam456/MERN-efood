const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
//import model
//const people = require('../model/userModel');
const shoopingItemModel = require('../model/shoppingItemModel');
const cartModel = require('../model/cartModel');
const ProductModel = require('../model/productModel')


const getshoppingItem = async (req, res) => {
    
    try{
        const users = await shoopingItemModel.find({'user.id': req.user._id}).populate('products').sort({createdAt: -1})
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

const getshoppingItemShopkeeper = async (req, res) => {
    //console.log(req.params.id)
    
    try{
        const users = await shoopingItemModel.find({selerId: req.user._id}).populate('products').sort({createdAt: -1});
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

const postshoppingItem = async (req, res) => {
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

const postshoppingItemArray = (req, res) => {
   
        let array = req.body.cart;
        array.forEach(async (e) => {
            //console.log(e._id)
        

            try{
                const response = await cartModel.findByIdAndDelete({_id: e._id})
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
            }catch(err){
                console.log(err.message)
            }
        

        });

    
}

const postDirect = async (req, res) => {
    //console.log(req.params.selerId);
    try{
        
            const item = new shoopingItemModel({
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
    
            response = await item.save();
        
        
        res.json({
             response,
        });

    } catch(err){
        console.log(err.message)
    }
}

const editshoppingItemStatus = async (req, res) => {
    //console.log(req.body)
    try{
        const response = await shoopingItemModel.findByIdAndUpdate({_id: req.params.id},
            {
                $set: {
                    status: req.body.status,
                }
            });
            res.json({
                user: response,
                msg: 'status Update successfully',
            })

        } catch(err){
        console.log(err.message)
    }
    // try{
    //     if(req.file){
    //         const response = await people.findByIdAndUpdate({_id: req.params.id},
    //             {
    //                 $set: {
    //                     name: req.body.name,
    //                     email: req.body.email,
    //                     phone: req.body.phone,
    //                     avater: req.file.filename,
    //                     role: req.body.role,
    //                 }
    //             });
    //             const delPath = path.join(__dirname, '..' , '..' , `public/userUpload/${response.avater}`)
    //             fs.unlinkSync(delPath);
    //             res.json({
    //                 user: response,
    //                 msg: 'user Update successfully',
    //             })


    //     } else{
    //         const response = await people.findByIdAndUpdate({_id: req.params.id},
    //             {
    //                 $set: {
    //                     name: req.body.name,
    //                     email: req.body.email,
    //                     phone: req.body.phone,
    //                     role: req.body.role,
    //                 }
    //             });
    //             res.json({
    //                 user: response,
    //                 msg: 'user Update successfully',
    //             })

    //     }
            

    // } catch(err){
    //     console.log(err.message)
    // }
}


const deleteshoppingItem = async (req, res) => {
    try{
        const response = await shoopingItemModel.findByIdAndDelete({_id: req.params.id});
        
        res.json({
            user: response,
            msg: 'shoppingItem delete successfully',
        })

    }  catch(err){
        console.log(err.message)
    }
}


module.exports = {
    getshoppingItem,
    postshoppingItem,
    editshoppingItemStatus,
    deleteshoppingItem,
    getshoppingItemShopkeeper,
    postDirect,
    postshoppingItemArray
}