const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UsersSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: Number
  },
  date: {
    default: Date.now,
    type: Date
  },
  avatar: {
    type: String
  }
})

const User = mongoose.model('users', UsersSchema)

module.exports = User
