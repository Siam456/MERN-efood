const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    avater: {
        type: String,
        default: null
    },
    sellerA: {
        id: mongoose.Types.ObjectId,
        name: String,
        email: String,
        phone: String,
        shopname: String,
        address: String,
    },
    views: {
        type: Number,
        default: 0,
    },
    feature: {
        type: String,
        enum: ["false" , "true"],
        default: 'false'
    }
},
{
    timestamps: true,
});

const people = mongoose.model('product' , Schema);

module.exports = people;