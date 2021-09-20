const mongoose = require('mongoose');

const schema = mongoose.Schema({
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
    address: {
        type: String,
        default: null,
    },
    avater: {
        type: String
    },
    role: {
        type: String,
        default: "rider"
    },
    vehicle: {
        type: String,
        default: null,
    }
},
{
    timestamps: true,
})

const riderRqModel = mongoose.model('riderRq', schema);

module.exports = riderRqModel;