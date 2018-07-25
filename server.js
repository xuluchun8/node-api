const express = require('express')
const mongoose = require('mongoose')
const app = express()

// 引入config
const keys = require('./config/keys')

// 测试根目录
app.get('/', (req, res) => {
  res.json('path is / for test')
})

// 连接数据库
mongoose.connect(keys.mongoURL)
  .then(() => {
    console.log('mongodb is connected')
  })

// 监听端口
const port = process.env.PORT || 3001
app.listen(port, function () {
  console.log('server is connect')
})
