const express = require('express');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser')


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}))
require('dotenv').config();

//cookie parser
app.use(cookieParser(process.env.COOKIE_PARSER));



//connect database
mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING, 
    {   useNewUrlParser: true,
        //useCreateIndex: true,
        useUnifiedTopology: true,}
        //useFindAndModify: true }
        )
.then(() => {
    console.log('connection successfully')
})
.catch(err => {
    console.log(err); 
});

//internal import
const users = require('./route/userRoute');
const login = require('./route/loginRoute');
const shopRq = require('./route/shoprqRoute');
const riderRq = require('./route/riderRqRoute');
const product = require('./route/addProduct');
const cart = require('./route/cartRout');
const shoppingitem = require('./route/shoppingItemRoute');
const deliveryItem = require('./route/delivaryRoute')

//create sub app
app.use('/user', users);
app.use('/login', login);
app.use('/shoprq', shopRq);
app.use('/riderRq', riderRq);
app.use('/product', product);
app.use('/cart', cart);

app.use('/shoppingitem', shoppingitem);
app.use('/deliveryitem', deliveryItem);

//logout 
const checklogin = require('./middleware/common/checkLogin')
 
app.get('/userprofile' , checklogin, (req, res) => {
    if(req.user){
        res.json({
            profile: req.user
        })
    }
})

app.get('/logout' , (req, res) => {
    console.log('siam')
    res.clearCookie(process.env.COOKIE_NAME);
    res.end()
})

app.use((err, req, res, next) => {
    if(err){
        console.log(err.message)
        res.status(500).json({
            errors: {
                avater: 'Choose jpg, png, jpeg'
            }
        });
    } else{
        res.status(500).send('There was an error');
    }
})

app.listen(process.env.PORT, () => {
    console.log(`server start successfully on port ${process.env.PORT}`)
})