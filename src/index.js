const express = require('express')
const router = require('./router/index')
var cors = require('cors')


// import router from './router'


const app = express()
app.use(cors())
app.use(express.json({limit: '21000000kb'}))
app.use('/api', router)

app.listen(3002, () => {
    console.log('listen in 3002')
  })