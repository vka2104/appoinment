const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors');
require('./config/database.config');
const port = process.env.PORT || 3000
const userRouter = require('./router/users.router');
const doctorRouter = require('./router/doctor.router');
const slotsRouter = require('./router/slots.router');


app.use(bodyParser.json());
app.use(cors())

// Routes
app.use('/api/user', userRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/slots', slotsRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})