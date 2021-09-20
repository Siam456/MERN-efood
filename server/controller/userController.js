const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
//import model
const people = require('../model/userModel');


const getSeller = async (req, res) => {
    try{
        const seller = await people.find({
        $or: [
            { role: 'seller' },
            { role: 'admin' },
          ]}, 
        {email: 0, phone:0 , password: 0, name:0, vehicle: 0 , avater:0, role: 0, createdAt:0, updatedAt:0,__v:0})
        .populate({path: "products"});

        if(seller){
            res.json({
                seller,
            })
        } else{
            res.status(404).json({
                msg: 'no seller found'
            })
        }
    } catch(err){
        res.status(500).json({
            msg: err.message
        })
    }
}


const getUser = async (req, res) => {
    try{
        const users = await people.find({})
        if(users){
            res.json({
                users,
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

const postUser = async (req, res) => {
    try{
        
        const salt = 10;
        const hashPass = await bcrypt.hash(req.body.password, salt);
        
        if(req.file){
            const user = new people({
                ...req.body,
                avater: req.file.filename,
                password: hashPass,
            });
    
            const response = await user.save();
            res.json({
                msg: 'user added successfully',
            });
        } else{
            const user = new people({
                ...req.body,
                password: hashPass,
            });
    
            const response = await user.save();
            res.json({
                msg: 'user added successfully',
            });
        }
        

    } catch(err){
        console.log(err.message)
    }
}

const editUser = async (req, res) => {
    try{
        //console.log(req.body)
        if(req.file){
            const response = await people.findByIdAndUpdate({_id: req.params.id},
                {
                    $set: {
                        name: req.body.name,
                        email: req.body.email,
                        phone: req.body.phone,
                        avater: req.file.filename,
                        role: req.body.role,
                        address: req.body.address,
                    }
                });
                const delPath = path.join(__dirname, '..' , '..' , `public/userUpload/${response.avater}`)
                fs.unlinkSync(delPath);
                res.json({
                    user: response,
                    msg: 'user Update successfully',
                })


        } else{
            const response = await people.findByIdAndUpdate({_id: req.params.id},
                {
                    $set: {
                        name: req.body.name,
                        email: req.body.email,
                        phone: req.body.phone,
                        role: req.body.role,
                        address: req.body.address,
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


const deleteUser = async (req, res) => {
    try{
        const response = await people.findByIdAndDelete({_id: req.params.id});
        if(response.avater){
            const delPath = path.join(__dirname, '..' , '..' , `public/userUpload/${response.avater}`)
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


module.exports = {
    getUser,
    postUser,
    editUser,
    deleteUser,
    getSeller
}