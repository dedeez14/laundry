require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DBURL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())


const laundryRoute = require('./router/laundryRoute')
const pegawaiRoute = require('./router/pegawaiRoute')
const customerRoute = require('./router/customerRoute')


app.use('/laundry', laundryRoute)
app.use('/pegawai', pegawaiRoute)
app.use('/customer', customerRoute)



app.listen(3000, () => {
    console.log('server berjalan pada port 3000')
})