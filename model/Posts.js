const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PostsSchema = new Schema({
  text: {
    required: true,
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  date: {
    default: Date.now,
    type: Date
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        require: true,
        type: String
      },
      date: {
        default: Date.now,
        type: Date
      }
    }
  ],
 
})

const Post = mongoose.model('posts', PostsSchema)

module.exports = Post
