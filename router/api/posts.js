const express = require('express')
const router = express.Router()
const password = require('passport')
// 引入验证函数
const isEmpty = require('../../validation/isEmpty')
const validatePost = require('../../validation/post')

// 引入数据User
const User = require('../../model/Users')
const keys = require('../../config/keys')
const Post = require('../../model/Posts')

// post 
router.post('/', password.authenticate('jwt', {session: false}), (req, res) => {
  const {errors, isValid} = validatePost(req.body)
  // console.log(errors,isvalid)

  if (!isValid) {
    return res.status(404).json(errors)
  }
  
})

// get 获取profile信息
router.get('/', password.authenticate('jwt', {session: false}), (req, res) => {

})



// get api/profile/user/:user_id  
// 该处不需要token,因为不需要使用req.user.id  public信息
router.get('/user/:user_id', (req, res) => {
  
})




module.exports = router
