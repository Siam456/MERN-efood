const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
//import model
//const people = require('../model/userModel');
const cartModel = require('../model/cartModel');


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