const express = require('express')
const connection = require('../../mysql')

const router = express.Router()

// router.use((_, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   next()
// })

router.get('/add', (req, res) => {
  const data = req.query
  // console.log(data, '请求添加的数据')
  const sql = `insert into my_table( name, age, sex, description) values ( ?, ?, ?, ? );`

  connection.query(sql, [data.name, Number(data.age), data.sex, data.description], (err, result) => {
    if (err) throw err
    res.send({
      code: 0,
      data: {
        insertId: result.insertId
      },
      message: '添加成功'
    })
    res.end()
  })
})

router.get('/search', (req, res) => {
  const data = req.query
  // console.log(data, '请求添加的数据')
  const sql = `select my_table_id as id, name, age, sex, description, height, width, color from my_table as a left join my_chair as b on a.id = b.my_table_id where age=${data.age || 10}`
  connection.query(sql, (err, result) => {
    if (err) throw err
    res.send({
      code: 0,
      data: result,
      message: '查询成功'
    })
    res.end()
  })
})

module.exports = router