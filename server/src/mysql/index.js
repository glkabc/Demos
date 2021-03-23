const mysql = require('mysql')
const config = require('../config')

const connection = mysql.createConnection({
  host: config.mysqlHost,
  user: config.mysqlUserName,
  password: config.mysqlUserPassword,
  database: config.mysqlUserDatabase
})

connection.connect()

console.log('======================数据库链接成功=========================')

module.exports = connection