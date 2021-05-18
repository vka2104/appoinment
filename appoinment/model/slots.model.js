const { ObjectId } = require('bson')
const mongoose = require('mongoose')
const moment = require('moment-timezone');
const dateIndia = moment.tz(Date.now(), "Asia/Kolkata");
let date = new Date(Date.now()).getTime()
const slotsSchema = new mongoose.Schema({
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    from_time: {
        type: String,
        required: true
    },
    to_time: {
        type: String,
        required: true
    },
    appoinment_date: {
        type: Date,
        required: true
    },
    slot_mode: {
        type: String,
        maxlength: 500,
        trim: true
    },
    is_booked: {
        type: Boolean,
        default: false
    }
},{timestamps: true})

const slotsModel = mongoose.model('slotsmaster', slotsSchema)

module.exports = slotsModel
