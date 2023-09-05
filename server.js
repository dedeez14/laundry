require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const pelangganRoute = require('./router/pelangganRoute')
const pesananRoute = require('./router/pesananRoute')
const detailPesananRoute = require('./router/detailPesananRoute')
const itemLaundryRoute = require('./router/itemLaundryRoute')
const laundryRoute = require('./router/laundryRoute')


const app = express()

mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))

app.use(cors());
app.use(bodyParser.json());

app.use('/pelanggan', pelangganRoute)
app.use('/pesanan', pesananRoute)
app.use('/detail_pesanan', detailPesananRoute)
app.use('/item_laundry', itemLaundryRoute)
app.use('/laundry', laundryRoute)



app.listen(4000, () => {
    console.log('server berjalan pada port 4000')
})