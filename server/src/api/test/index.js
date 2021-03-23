const express = require('express')
const connection = require('../../mysql')

const router = express.Router()

// router.use((_, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   next()
// })

router.get('/get', (req, res) => {
  const params = req.query
  console.log(params, 'get 传参')
  const sql = 'SELECT * FROM my_table'
  connection.query(sql, (err, result) => {
    if (err) {
      throw err
    } else {
      res.send(result)
      res.end()
    }
  })
})

router.post('/post', (req, res) => {
  const body = req.body
  console.log(body, 'post 传参')
  const sql = 'SELECT * FROM my_table'
  connection.query(sql, (err, result) => {
    if (err) {
      throw err
    } else {
      res.send(result)
      res.end()
    }
  })
})

module.exports = router