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
    status: {
        type: String,
        default: 'Preparing'
    },
    rider: {
        id: mongoose.Types.ObjectId,
        name: String,
        email: String,
        phone: String,
        address: String
    }
    
},
{
    timestamps: true,
});

const cartModel = mongoose.model('shoopingItem' , Schema);

module.exports = cartModel;