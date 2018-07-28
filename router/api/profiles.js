const express = require('express')
const router = express.Router()
const password = require('passport')
// 引入验证函数
const isEmpty = require('../../validation/isEmpty')
const validateProfile = require('../../validation/profile')

// 引入数据User
const User = require('../../model/Users')
const Profile = require('../../model/Profiles')
const keys = require('../../config/keys')

// post 
router.post('/', password.authenticate('jwt', {session: false}), (req, res) => {
  const {errors, isvalid} = validateProfile(req.body)
  // console.log(errors,isvalid);
  
  if(isvalid){
    return res.status(404).json(errors)
  }
  const profilesFields = {}
  profilesFields.user = req.user.id
  if (req.body.handle) profilesFields.handle = req.body.handle
  if (req.body.company) profilesFields.company = req.body.company
  if (req.body.status) profilesFields.status = req.body.status

  if (req.body.skills) profilesFields.skills = req.body.skills.split(',')

  profilesFields.social = {}
  if (req.body.QQ) profilesFields.social.QQ = req.body.QQ
  if (req.body.tengxunkt) profilesFields.social.tengxunkt = req.body.tengxunkt
  if (req.body.wangyikt) profilesFields.social.wangyikt = req.body.wangyikt

  Profile.findOne({user: req.user.id}).then(profile => {
    if (profile) {
      // //  //用户信息存在，执行更新方法
      Profile.update({user: req.user.id}, {$set: profilesFields}, (err) => {
        if (err) {
          console.log(err)
        }else {
          console.log('updata success')
        }
      })
      Profile.findOne({user: req.user.id}).then(
        profile => res.json(profile)
      )
    }else {
      Profile.findOne({handle: req.body.handle})
        .then(profile => {
          if (profile) {
            errors.handle = '该用户handle信息乙存在，请勿从新创建'
            res.status(400).json(errors)
          }
          console.log(profilesFields.handle + 'handle')

          new Profile(profilesFields).save()
            .then(profile => {
              res.json(profile)
            })
        })
    }
  })
})

// get 获取profile信息
router.get('/', password.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {}

  Profile.findOne({user: req.user.id})
    // 返回关联的user数据
    .populate('user',['name','avatar','email'])
    .then(profile => {
    // 考虑到没有该数据的时候
    if (!profile) {
      errors.noprofile = '该用户的信息不存在'
      return res.status(404).json(errors)
    }
    res.json(profile)
  })
    // 没有找到报错
    .catch(err => {
      res.status(404).json(err)})
})

// get api/profile/handle/:handle  
// 该处不需要token,因为不需要使用req.user.id  public信息
router.get('/handle/:handle',(req,res) => {
  const errors = {}
  Profile.findOne({handle :req.params.handle})
    .populate('user',['name'])
    .then(profile => {
      if(!profile){
        errors.name = "there is no the profile"
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => {
      res.json(err)
    })
})

// get api/profile/user/:user_id  
// 该处不需要token,因为不需要使用req.user.id  public信息
router.get('/user/:user_id',(req,res) => {
  const errors = {}
  Profile.findOne({user :req.params.user_id})
    .populate('user',['name'])
    .then(profile => {
      if(!profile){
        errors.name = "there is no the profile"
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => {
      res.json(err)
    })
})

// get api/profile/handle/:handle  
// 该处不需要token,因为不需要使用req.user.id  public信息
router.get('/all',(req,res) => {
  const errors = {}
  //取得所有的信息
  Profile.find()
    .populate('user',['name'])
    .then(profile => {
      if(!profile){
        errors.name = "there is no the profile"
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => {
      res.json(err)
    })
})
module.exports = router
