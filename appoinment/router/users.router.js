const express = require('express')
const usersController = require('../controller/users.controller')
const router = new express.Router()

// add
router.post("/add", usersController.addUser)

// get Single user
router.get("/getuser/:user_id", usersController.getUserById)

// list
router.get("/getusersdetails", usersController.getUserList)

module.exports = router