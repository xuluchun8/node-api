const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateProfileExperience (data) {
  let errors = {}
  data.title = !isEmpty(data.title) ? data.title : "" 
  data.company = !isEmpty(data.company) ? data.company : "" 
  data.from = !isEmpty(data.from) ? data.from : "" 
  data.to = !isEmpty(data.to) ? data.to : "" 

  if(validator.isEmpty(data.company)){
    errors.company = '名字不能为空'
  }
  if(validator.isEmpty(data.title)){
    errors.title = 'title不能为空'
  }
  if(validator.isEmpty(data.from)){
    errors.from = 'from不能为空'
  }
  if(validator.isEmpty(data.to)){
    errors.to = 'to不能为空'
  }
  return {
    errors,
    isValid : isEmpty(errors)
  }
}
