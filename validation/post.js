const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validatePost (data) {
  let errors = {}
  data.name = !isEmpty(data.name) ? data.name : ''
  data.avatar = !isEmpty(data.avatar) ? data.avatar : ''
  data.text = !isEmpty(data.text) ? data.text : ''
  data.comments = !isEmpty(data.comments) ? data.comments : ''
  data.likes = !isEmpty(data.likes) ? data.likes : ''
  data.date = !isEmpty(data.date) ? data.date : ''

  if (validator.isEmpty(data.likes)) {
    errors.likes = '名字不能为空'
  }
  if (validator.isEmpty(data.comments)) {
    errors.comments = 'comments不能为空'
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
