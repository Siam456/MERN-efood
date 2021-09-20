const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    products: {
            type: mongoose.Types.ObjectId,
            ref: "product"
    }, user: {
        id: mongoose.Types.ObjectId,
        name: String,
        email: String,
        phone: String,
        address: String
    },
    quantity: {
        type: Number,
        default: 1,
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    selerId: {
        type: mongoose.Types.ObjectId,
    },
    
},
{
    timestamps: true,
});

const cartModel = mongoose.model('cart' , Schema);

module.exports = cartModel;