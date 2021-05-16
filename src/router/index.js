const express = require('express')
const scriptRouter = require('./scriptRouter')
const vocabularyRouter = require('./vocabularyRouter')
const textRouter = require('./textRouter')
const playSoundRoute = require('./playSoundRouter')

const router = express.Router()

router.use('/', scriptRouter)
router.use('/', vocabularyRouter)
router.use('/', textRouter)
router.use('/', playSoundRoute)


module.exports = router