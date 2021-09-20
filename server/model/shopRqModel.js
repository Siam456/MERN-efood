const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    shopname: {
        type: String,
        default: null,
    },
    address: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        default: 'seller',
    },
    avater: {
        type: String,
        default: null
    },
    menu: { 
        type: String,
        default: null
    },
},
{
    timestamps: true,
});

const shoprq = mongoose.model('shoprq' , Schema);

module.exports = shoprq;