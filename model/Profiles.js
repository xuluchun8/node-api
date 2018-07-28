const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  // 关联users表格
  user:{
    type:Schema.Types.ObjectId,
    ref:"users"
  },
  handle: {
    required: true,
    type: String,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      current: {
        default: true,
        type: Boolean
      },
      title: {
        required: true,
        type: String
      },
      company: {
        required: true,
        type: String
      },
      location: {
        // required: true,
        type: String
      },
      from: {
        required: true,
        type: String
      },
      description: {
        // required: true,
        type: String
      },
      to: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        default: false,
        type: Boolean
      },
      degree: {
        required: true,
        type: String
      },
      fieldofstudy: {
        // required: true,
        type: String
      },
      location: {
        required: true,
        type: String
      },
      from: {
        // required: true,
        type: String
      },
      description: {
        required: true,
        type: String
      },
      to: {
        type: String
      }
    }
  ],
  social: {
      QQ: {
        required: true,
        type: String
      },
      tengxunkt: {
        required: true,
        type: String
      },
      wangyikt: {
        required: true,
        type: String
      }
    },
    date:{
      type:Date,
      default:Date.now
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)
