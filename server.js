// 引入模块
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

// 引入文件
const keys = require('./config/keys')
const users = require('./router/api/users')

// 使用中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
// app.use(bodyParser.json())


// 测试根目录
app.get('/', (req, res) => {
  res.json('path is / for test')
})

// 路由（引用路由文件）
app.use('/api/users',users)

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
