const dotenv = require('dotenv').config()
const express = require('express')
const router = require('./router/index')
var cors = require('cors')

const port  = process.env.SERVER_PORT
console.log('port', port)


// import router from './router'


const app = express()
app.use(cors())
app.use(express.json({limit: '21000000kb'}))
app.use('/api', router)

app.listen(port, () => {
    console.log(`listen in ${port}`)
  })