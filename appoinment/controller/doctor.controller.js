const DoctorMasterModel = require('../model/doctor.model');
const mongo = require('mongodb')
const addDoctor = async (req, res) => {
    if(req.body) {
        const doctor = await new DoctorMasterModel(req.body)
        doctor.save().then((data) => {
            res.status(201).send(
                {
                    error: false,
                    message: '',
                    data: data
                })
        }).catch((e) => {
            console.log(e)
            res.status(400).send(e)
        })
    }
   
}

const getDoctorList =  async (req, res) => {
    try {
        const doctorDetails = await DoctorMasterModel.findOne({})
        res.status(200).send(
            {
                error: false,
                message: '',
                data: doctorDetails
            }
        )
    } catch (e) {
        res.status(500).send(e)
    }
}
module.exports = {
    addDoctor,
    getDoctorList
}