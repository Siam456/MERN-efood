const people = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const login = (req, res) => {
    //console.log(req.body)
    res.end();
}

const loginPost = async (req, res) => {
    //console.log(req.body)
    try{
        const user = await people.findOne({
            $or: [
                { email: req.body.username },
                { phone: req.body.username },
              ]
        });

        const checkPass = await bcrypt.compare(req.body.password, user.password);
        if(checkPass){
            //console.log(user);
            const userObj = {
                role: user.role,
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                shopname: user.shopname,
                address: user.address,
                status: user.status
            }
            const token = jwt.sign(userObj, process.env.JWT_SECRATE , {
                expiresIn: process.env.JWT_EXPIRE,
            })

            //set cookies
            res.cookie(process.env.COOKIE_NAME, token,{
                maxAge: process.env.JWT_EXPIRE,
                signed: true,
                })
            res.send('ok')
            
        } else{
            console.log('tf')
            res.status(404).json({
                err: 'Login Failed'
            })
        }

        

    } catch(err){
        console.log(err.message)
        res.status(404).json({
            err: 'a Login Failed'
        })
    }
}

module.exports = {login,loginPost};