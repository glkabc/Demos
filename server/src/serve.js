  const express = require('express');
  const bodyParser = require('body-parser')
  const routers = require('./api')
  const config = require('./config')
  
  const app = express()
  app.use(bodyParser.urlencoded({extended:false}))

  app.use('/my', routers)

  app.listen(config.serveProt, () => {
    console.log(`listen ${config.localHostAddress} ${config.serveProt} port .....` )
  })