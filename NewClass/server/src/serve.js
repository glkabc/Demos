 // 引进express
  const express = require('express');
  // 引进mockjs
  const Mock = require('mockjs')

  // 准备服务对象
  const app = express()

  // 监听路由
  app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    // 准备随机数据
    var data = Mock.mock({
      'list': [
      {
        'id': 1,
        'name': 'c++',
        'imgUrl': '/upload.png',
      },
      {
        'id': 2,
        'name': 'c++',
        'imgUrl': '/upload.png',
      },
      {
        'id': 3,
        'name': 'c++',
        'imgUrl': '/upload.png',
      }
      ]
    })
    res.end(JSON.stringify(data));
  })

  // 开启服务
  app.listen(3000)