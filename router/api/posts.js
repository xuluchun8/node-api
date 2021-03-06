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
const Profile = require('../../model/Profiles')
// post 
router.post('/', password.authenticate('jwt', {session: false}), (req, res) => {
  const {errors, isValid} = validatePost(req.body)
  if (!isValid) {
    return res.status(404).json(errors)
  }
  Post.findOne({uer: req.user.id}).then(post => {
    if (!post) {
      const newPost = {
        text: req.body.text,
        user: req.user.id
      }
      newPost.comments = []
      newPost.likes = []
      if (req.body.comments) newPost.comments.text = req.body.comments
      new Post(newPost).save().then(post => {
        res.json(post)
      })
    }
  })
})

// get 获取所有评论的信息，不需要验证user
router.get('/', (req, res) => {
  Post.find()
    .sort({date: -1})
    .then(post => {
      res.json(post)
    })
    .catch(err => {
      res.status(404).json(err)
    })
})

// get 单个post的评论
router.get('/:id', password.authenticate('jwt', {session: false}), (req, res) => {
  Post.findById(req.params.id)
    // .sort({date : -1})
    .then(post => {
      res.json(post)
    })
    .catch(err => {
      res.status(404).json('找不发该评论信息')
    })
})

// delete 单个post的评论
router.delete('/:id', password.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id})
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          console.log(post + '------')

          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({notauthorized: '非法操作'})
          }
          post.remove().then(() => {
            res.json({success: '成功删除对应评论'})
          })
        })
        .catch(err => {
          res.status(404).json('找不发该评论信息')
        })
    })
})

// post api/posts/like/:id
router.post('/like/:id',password.authenticate('jwt', {session: false}),(req,res) => {
  Post.findById(req.params.id).then(post => {
    console.log(post);
    
    if(post.likes.filter(like => like.user.toString() == req.user.id).length > 0){
      return res.status(400).json({liked : "该user已点赞"})
    }
    post.likes.push({user : req.user.id})
    post.save().then(post => {res.json(post)})
  })
  .catch(er => res.status(404).json({msg : "点赞出错"}))
})

// // delete api/posts/like/:id
router.delete('/unlike/:id',password.authenticate('jwt', {session: false}),(req,res) => {
  Post.findById(req.params.id).then(post => {
    // 如果没有点过赞
    if(post.likes.filter(like => like.user.toString() == req.user.id).length = 0){
      return res.status(404).json('该user未点赞过')
    }
    const removeIndex = post.likes.indexOf(req.user.id)
    post.likes.splice(removeIndex,1)
    post.save().then(post => {res.json('unlike sucess')})
  })
  .catch(er => res.status(404).json({msg : "点赞出错"}))
})

module.exports = router
