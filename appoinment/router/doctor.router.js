const express = require('express')
const doctorController = require('../controller/doctor.controller')
const router = new express.Router()

// add
router.post("/add", doctorController.addDoctor)

// list
router.get("/getdoctordetails", doctorController.getDoctorList)


module.exports = router