const express = require('express')
const slotsController = require('../controller/slots.controller')
const router = new express.Router()

// add
router.post("/addslot", slotsController.addSlot)

// list
router.get("/getslotList/:appoinment_date", slotsController.getSlotListByDate)

// bookAppointment
router.post("/bookappointments", slotsController.bookAppointments)

// filterappointmentlist
router.get("/filterappointmentlist/:appoinment_date", slotsController.filterAppointmentList)

// getappointmentlist
router.get("/getappointmentlist/", slotsController.getAppointmentList)

module.exports = router