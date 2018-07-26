const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
// 引入数据User
const User = require('../../model/Users')
// GET api/users/login
router.get('/login', (req, res) => {
  res.send('/api/login')
})

// POST  api/users/register
router.post('/register', (req, res) => {
  // 查询数据库
  User.findOne({email: req.body.email})
    .then(user => {
      // 查询到user，说明该邮箱已被注册
      if (user) {
        return res.status(400).json({email: '该邮箱已被注册'})
      }else {
        // 如果邮箱没有被注册，则新建一条document
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        })
        // 使用bcrypt加密password
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(req.body.password, salt, function (err, hash) {
            if (err) throw err
            newUser.password = hash
          })
        })
        // 将请求的数据保存到数据库
        newUser.save(user)
          .then((user) => {
            res.json(user)
          })
          .catch(err => {
            console.log(err)
          })

          // 保存该条document

      }
    })
})
module.exports = router
