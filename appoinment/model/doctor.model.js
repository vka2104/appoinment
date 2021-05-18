const mongoose = require('mongoose')
const moment = require('moment-timezone');
const dateIndia = moment.tz(Date.now(), "Asia/Kolkata");


const doctorMasterSchema = new mongoose.Schema({
    user_name: {
        type: String,
        unique: true,
        required: true,
        maxlength: 100,
        trim: true
    },
    phonenumber: {
        type: Number
       
    },
    designation: {
        type: String,
        maxlength: 100,
        trim: true
    },
    address: {
        type: String,
        maxlength: 500,
        trim: true
    },
    createdAt: {
        type: Date,
        default: dateIndia
    }
})

const doctorMasterModel = mongoose.model('doctormaster', doctorMasterSchema)

module.exports = doctorMasterModel