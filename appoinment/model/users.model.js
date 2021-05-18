const mongoose = require('mongoose')
const validator = require('validator')
const moment = require('moment-timezone');
const dateIndia = moment.tz(Date.now(), "Asia/Kolkata");


const usersMasterSchema = new mongoose.Schema({
    user_name: {
        type: String,
        unique: true,
        required: true,
        maxlength: 100,
        trim: true
    },
    email_id: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    phonenumber: {
        type: Number
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

const userMasterModel = mongoose.model('usersmaster', usersMasterSchema)

module.exports = userMasterModel