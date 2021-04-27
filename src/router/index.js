const express = require('express')
const scriptRouter = require('./scriptRouter')
const vocabularyRouter = require('./vocabularyRouter')
const textRouter = require('./textRouter')

const router = express.Router()

router.use('/script', scriptRouter)
router.use('/vocabulary', vocabularyRouter)
router.use('/text', textRouter)





module.exports = router