const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    const cookies = 
        Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null ;

    
    if(cookies){
        const token = cookies[process.env.COOKIE_NAME];
        const decode = jwt.verify(token, process.env.JWT_SECRATE);
        req.user = decode;
        next();
    } else{
        res.status(500).json({
            err: 'muri khao'
        })
    }
}

module.exports = checkLogin;