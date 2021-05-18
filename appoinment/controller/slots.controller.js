const SlotsModel = require('../model/slots.model');
const UsersMasterModel = require('../model/users.model');


const getDateTimeDifference = (fromDate, toDate) => {
    let diff = toDate - fromDate;
    var msec = diff;
    var hours = Math.floor(msec / 1000 / 60 / 60);
    msec -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(msec / 1000 / 60);
    msec -= minutes * 1000 * 60;
    var seconds = Math.floor(msec / 1000);
    msec -= seconds * 1000;
    return {
      hours,
      minutes,
      seconds,
      msec
    }
  }
  
const addSlot = async (req, res) => {
    try {
        if (req.body) {
            const isSlotExist = await SlotsModel.find({
                from_time: req.body.from_time,
                to_time: req.body.to_time,
                appoinment_date: req.body.appoinment_date
            });
            if (isSlotExist.length > 0) {
                res.status(200).send({
                error: true,
                message: 'slot already exist',
                data: []
            })
            } else {
                const from_time_list = await SlotsModel.find({appoinment_date: req.body.appoinment_date},{from_time: 1, _id: 0})
                var isSlotAlreadyExist = false;
                from_time_list.forEach(res => {
                    const from_datetime = new Date(`${req.body.appoinment_date} ${res.from_time}`).toString(undefined, {timeZone: 'Asia/Kolkata'})
                    const new_from_datetime = new Date(`${req.body.appoinment_date} ${req.body.from_time}`).toString(undefined, {timeZone: 'Asia/Kolkata'})

                    const responseTimeDifferenceOne = getDateTimeDifference(new Date(new_from_datetime), new Date(from_datetime));
                    const responseTimeDifferenceTwo = getDateTimeDifference(new Date(from_datetime), new Date(new_from_datetime));
                    if((responseTimeDifferenceOne.hours === 0 && 
                        responseTimeDifferenceOne.minutes < 30 && 
                        responseTimeDifferenceOne.minutes > 0 && 
                        responseTimeDifferenceOne.seconds === 0) ||
                    (responseTimeDifferenceTwo.hours === 0 && 
                        responseTimeDifferenceTwo.minutes < 30 &&
                        responseTimeDifferenceTwo.minutes > 0 && 
                        responseTimeDifferenceTwo.seconds === 0) ) {
                            isSlotAlreadyExist = true;
                        } 
                    // console.log(responseTimeDifferenceOne,responseTimeDifferenceTwo);
                })
                if(isSlotAlreadyExist === false) {
                   
                    const slot = await new SlotsModel(req.body)
                    slot.save().then((data) => {
                        res.status(201).send(
                            {
                                error: false,
                                message: 'New Slot Created Successfully',
                                data: data
                            }
                        )
                    }).catch((e) => {
                        console.log(e)
                        res.status(400).send(e)
                    })
                } else {
                    res.status(200).send(
                        {
                            error: true,
                            message: 'You from_time is between existing slot time.Please choose some other from time.',
                            data: []
                        }
                    )
                }
            }

        }
    } catch (e) {
        res.status(500).send(e)
    }  

}

const getSlotListByDate = async (req, res) => {
    try {
        const slotsList = await SlotsModel.find({
        appoinment_date: new Date(req.params.appoinment_date)
        })
        res.status(200).send(
            {
                error: false,
                message: '',
                data: slotsList
            }
        )
        
    } catch (e) {
        res.status(500).send(e)
    }
}

const bookAppointments = async (req, res) => {
    try {
        const isSlotExist = await SlotsModel.findById(req.body.slot_id).exec()
        if (isSlotExist) {
            const isUserExist = await UsersMasterModel.findById(req.body.user_id).exec()
            if (isUserExist) {
                const is_updated = await SlotsModel.updateOne(
                    { _id: req.body.slot_id, is_booked: false, user_id: null },
                    { is_booked: true, user_id: req.body.user_id })
                if (is_updated.n > 0 && is_updated.nModified > 0) {
                    res.status(200).send(
                    {
                        error: true,
                        message: 'Your Appoinment Booked',
                        data: []
                    })
                } else {
                    res.status(200).send(
                    {
                        error: true,
                        message: 'Slot Already Booked',
                        data: []
                    })
                }
            } else {
                res.status(200).send(
                {
                    error: true,
                    message: 'user not exist (or) invalid user',
                    data: []
                })
            }
        } else {
            res.status(200).send(
            {
                error: true,
                message: 'slot not exist',
                data: []
            })
        }
    } catch (e) {
        res.status(500).send(e)
    }
}


const getAppointmentList = async (req, res) => {
    try {
        const bookedSlots = await SlotsModel.find({
            user_id: { $ne: null },
            is_booked: true
        })
        if (bookedSlots.length > 0) {
            // const userIdList = [];
            // const userIdList  = bookedSlots.map(async (data, i) => {
            //     const userDetailsList = await UsersMasterModel.findOne({
            //         _id: data.user_id
            //     });
            //     return { ...data._doc, ...userDetailsList._doc }
            //     // userIdList.push(data)
            //     // if (i === (bookedSlots.length - 1)) return res.status(200).send({data: bookedSlots.length});
            // })

            const userDetailsList = await UsersMasterModel.find();
            const userAppointmentDetails  = [];
             bookedSlots.forEach(async (data, i) => {
               const filteredUser =await userDetailsList.filter( (val) => {
                   return (val._id).toString() == (data.user_id).toString()
                })
                userAppointmentDetails.push({...data._doc,...filteredUser[0]._doc});
             if (i === (bookedSlots.length - 1)) return res.status(200).send(
                {
                    error: false,
                    message: '',
                    data: userAppointmentDetails
                });
            })
        } else {
            res.status(200).send(
            {
                error: true,
                message: "No Result Found",
                data: []
            })
        }
    } catch (e) {
        res.status(500).send(e)
    }
}
const filterAppointmentList = async (req, res) => {
    try {
        const bookedSlots = await SlotsModel.find({
            user_id: { $ne: null },
            is_booked: true,
            appoinment_date: new Date(req.params.appoinment_date)
        })
        if (bookedSlots.length > 0) {
        
            const userDetailsList = await UsersMasterModel.find();
            const userAppointmentDetails  = [];
             bookedSlots.forEach(async (data, i) => {
               const filteredUser =await userDetailsList.filter( (val) => {
                   return (val._id).toString() == (data.user_id).toString()
                })
                userAppointmentDetails.push({...data._doc,...filteredUser[0]._doc});
             if (i === (bookedSlots.length - 1)) return res.status(200).send(
                {
                    error: false,
                    message: '',
                    data: userAppointmentDetails
                }
             );
            })
        } else {
            res.status(200).send(
                {
                    error: true,
                    message: "No Result Found",
                    data: []
                }
            )
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

module.exports = {
    addSlot,
    getSlotListByDate,
    bookAppointments,
    getAppointmentList,
    filterAppointmentList
}