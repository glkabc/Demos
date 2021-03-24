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
  const sql = 'select my_table_id as id, name, age, sex, description, height, width, color from my_table as a left join my_chair as b on a.id = b.my_table_id;'
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
  console.log(body.name, 'post 传参')
  const sql = 'select my_table_id as id, name, age, sex, description, height, width, color from my_table as a left join my_chair as b on a.id = b.my_table_id;'
  connection.query(sql, (err, result) => {
    if (err) {
      throw err
    } else {
      res.send(result)
      res.end()
    }
  })
})

router.get('/add-more', (req, res) => {
  const query = req.query
  let sql = 'insert into my_table(name, age, sex, description) values (?, ?, ?, ?)'
  let sqlVale = [query.name, query.age, query.sex, query.description]
  connection.query(sql, sqlVale, (err, result) => {
    if (err) throw err
    let insertId = result.insertId
    sql = 'insert into my_chair(height, width, color, my_table_id) values (?, ?, ?, ?)'
    sqlVale = [query.height, query.width, query.color, insertId]
    connection.query(sql, sqlVale, (err, result) => {
      if(err) throw err
      res.send({
        code: 0,
        messages: '插入成功',
        data: result
      })
    })
  })
})

module.exports = router