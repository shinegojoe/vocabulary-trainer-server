const fs = require('fs')
var express = require('express')
var router = express.Router()
var axios = require('axios')

const host  = process.env.SOUND_SERVER_HOST
const port  = process.env.SOUND_SERVER_PORT
const gttsFile = process.env.GTTS_FILE

router.post('/playSound', async(req, res, next)=> {
    try {
        console.log(req.body)
        const url = `${host}:${port}`
        const gtts = await axios({
            method: 'POST',
            url: url,
            data: req.body
        })
        var data = fs.readFileSync(gttsFile)
        res.send(data)
    } catch(e) {
        console.log(e)
    } finally {

    }
})

module.exports = router