const UsersMasterModel = require('../model/users.model');
const addUser = async (req, res) => {
    if(req.body) {
        const user = await new UsersMasterModel(req.body)
        user.save().then((data) => {
            res.status(201).send(
                {
                    error: false,
                    message: 'User Added Successfully',
                    data: data
                }
            )
        }).catch((e) => {
            console.log(e)
            res.status(400).send(e)
        })
    }
   
}

const getUserList =  async (req, res) => {
    try {
        const userDetails = await UsersMasterModel.find({})
        res.status(200).send(
            {
                error: false,
                message: '',
                data: userDetails
            }
        )
    } catch (e) {
        res.status(500).send(e)
    }
}
const getUserById =  async (req, res) => {
    try {
        const user = await UsersMasterModel.findById(req.params.user_id)
        res.status(200).send(
            {
                error: false,
                message: '',
                data: user
            }
        )
    } catch (e) {
        res.status(500).send(e)
    }
}

module.exports = {
    addUser,
    getUserList,
    getUserById
}