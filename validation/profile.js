const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateProfile (data) {
  let errors = {}
  data.handle = !isEmpty(data.handle) ? data.handle : ''
  data.skills = !isEmpty(data.skills) ? data.skills : ''
  data.QQ = !isEmpty(data.QQ) ? data.QQ : ''
  data.tengxunkt = !isEmpty(data.tengxunkt) ? data.tengxunkt : ''
  data.wangyikt = !isEmpty(data.wangyikt) ? data.wangyikt : ''
  data.company = !isEmpty(data.company) ? data.company : ''

  if (validator.isEmpty(data.company)) {
    errors.company = '名字不能为空'
  }
  if (validator.isEmpty(data.skills)) {
    errors.skills = 'skills不能为空'
  }
  if (validator.isEmpty(data.QQ)) {
    errors.QQ = 'QQ不能为空'
  }
  if (validator.isEmpty(data.tengxunkt)) {
    errors.tengxunkt = 'tengxunkt不能为空'
  }
  if (validator.isEmpty(data.wangyikt)) {
    errors.wangyikt = 'password不能为空'
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
