const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
// 引入数据User
const User = require('../../model/Users')

// POST  api/users/register
router.post('/register', (req, res) => {
  // 查询数据库
  User.findOne({email: req.body.email})
    .then(user => {
      // 查询到user，说明该邮箱已被注册
      if (user) {
        return res.status(400).json({email: '该邮箱已被注册'})
      }else {
        // 使用全球公认的头像
        const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'})
        // 如果邮箱没有被注册，则新建一条document
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        avatar
      })
        // 使用bcrypt加密password
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(req.body.password, salt, function (err, hash) {
            if (err) throw err
            newUser.password = hash

            newUser.save(user)
              .then((user) => {
                res.json(user)
              })
              .catch(err => {
                console.log(err)
              })
          })
        })
        // 将请求的数据保存到数据库

        // 保存该条document

      }
    })
})

// GET api/users/login 
// 登录成功则返回token
router.post('/login', (req, res) => {
  const password = req.body.password
  const email = req.body.email

  User.findOne({email})
    .then(user => {
      if (!user) {
        res.status('404').json({email: '没有找到对应邮箱'})
      }else {
        bcrypt.compare(password, user.password)
          .then(isMath => {
            if (!isMath) {
              res.json({password: '密码不正确'})
            }else {
              res.json('登录成功')
            }
          })
      }
    })
})

module.exports = router
