const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
//import model

const riderRq = require('../model/riderRqModel')


const getRiderRq = async (req, res) => {
    try{
        const users = await riderRq.find({})
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

const postRiderRq = async (req, res) => {
            try{
                //console.log(req.body);
                if(req.file){
                    const user = new riderRq({
                        ...req.body,
                        avater: req.file.filename,
                    });
            
                    const response = await user.save();
                    res.json({
                        msg: 'user added successfully',
                    });
                } else{
                    const user = new riderRq({
                        ...req.body,
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



const deleteRiderRq = async (req, res) => {
    try{
        const response = await riderRq.findByIdAndDelete({_id: req.params.id});
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
    getRiderRq,
    postRiderRq,
    deleteRiderRq
}