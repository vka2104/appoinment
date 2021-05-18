const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://vasanth:India123@cluster0.hagny.mongodb.net/appointmentmanagement?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then( () => {
    console.log('connected...')
}).catch( e => console.log(e))