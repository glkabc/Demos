const express = require('express')
const config = require('../config')
const home = require('./home')
const test = require('./test')

const router = express.Router()

router.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', config.allowUserHost)
  next()
})

router.use('/home', home)
router.use('/test', test)

module.exports = router