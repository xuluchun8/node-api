// 引入模块
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()


// 引入文件
const keys = require('./config/keys')
const users = require('./router/api/users')
const profiles = require('./router/api/profiles')
const posts = require('./router/api/posts')
// 使用中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json()) 
 
// possport初始化
app.use(passport.initialize())

// 路由（引用路由文件）
app.use('/api/users',users)
app.use('/api/profiles',profiles)
app.use('/api/posts',posts)
// 测试根目录
app.get('/', (req, res) => {
  res.json('path is / for test')
})

// 引入passport.js
require('./config/passport')(passport)

// 连接数据库
mongoose.connect(keys.mongoURL)
  .then(() => {
    console.log('mongodb is connected')
  })

// 监听端口
// process.env.PORT 设置PORT的环境变量
const port = process.env.PORT || 3001
app.listen(port, function () {
  console.log('server is connect')
})
