const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateProfileEducation (data) {
  let errors = {}
  data.degree = !isEmpty(data.degree) ? data.degree : "" 
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "" 
  data.location = !isEmpty(data.location) ? data.location : "" 
  data.description = !isEmpty(data.description) ? data.description : "" 

  if(validator.isEmpty(data.fieldofstudy)){
    errors.fieldofstudy = '名字不能为空'
  }
  if(validator.isEmpty(data.degree)){
    errors.degree = 'degree不能为空'
  }
  if(validator.isEmpty(data.location)){
    errors.location = 'location不能为空'
  }
  if(validator.isEmpty(data.description)){
    errors.description = 'description不能为空'
  }
  return {
    errors,
    isValid : isEmpty(errors)
  }
}
