
const shopRqModel = require('../model/shopRqModel');
const fs = require('fs');
const path = require('path');

const getShopRq = async (req, res) => {
    try{
        
        const response = await shopRqModel.find({});
        if(response){
            res.json({
                data: response
            })
        } else{
            res.status(404).json({
                err: 'somethingWrong boy'
            })
        }

    } catch(err){
        res.status(404).json({
            err: err.message
        })
    }
}

const postShoprq = async (req, res) => {
    try{
        //console.log(req.files.avater[0].filename) 

        if(req.files.avater === undefined && req.files.menu === undefined){
            const user = new shopRqModel(req.body);
    
            const response = await user.save();
            res.json({
                msg: 'user added successfully',
            });
        } else if(req.files.avater === undefined && req.files.menu !== undefined){
            const user = new shopRqModel({
                ...req.body,
                menu: req.files.menu[0].filename
            });
    
            const response = await user.save();
            res.json({
                msg: 'user added successfully',
            });
        } else if(req.files.menu === undefined && req.files.avater !== undefined){
            const user = new shopRqModel({
                ...req.body,
                avater: req.files.avater[0].filename,
            });
    
            const response = await user.save();
            res.json({
                msg: 'user added successfully',
            });
        } else{
            const user = new shopRqModel({
                ...req.body,
                avater: req.files.avater[0].filename,
                menu: req.files.menu[0].filename
            });
    
            const response = await user.save();
            res.json({
                msg: 'user added successfully',
            });
        }

        

        

    } catch(err){
        //console.log(err.message)
        res.status(404).json({
            err: err.message
        })
    }

}

const deleteShoprq = async (req, res) => {
    try{
        const response = await shopRqModel.findByIdAndDelete({_id:req.params.id});
        if(response.avater){
            //console.log(path.join(__dirname, '..' , '..' , `public/userUpload/${response.avater}`))
            const delPath = path.join(__dirname, '..' , '..' , `public/userUpload/${response.avater}`)
            fs.unlinkSync(delPath);
        }
        else if(response.menu){
            //console.log(path.join(__dirname, '..' , '..' , `public/userUpload/${response.avater}`))
            const delPath = path.join(__dirname, '..' , '..' , `public/menuUpload/${response.menu}`)
            fs.unlinkSync(delPath);
        }
        res.json({
            user: response,
            msg: 'user delete successfully',
        })
    } catch(err){
        throw err.message
    }
}

module.exports = {
    getShopRq,
    postShoprq,
    deleteShoprq
};