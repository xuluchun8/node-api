const isEmpty = require('./isEmpty')
const validator = require('validator')

module.exports = function validateLoginInput (data) {
  let errors = {}
  data.email = !isEmpty(data.email) ? data.email : "" 
  data.password = !isEmpty(data.password) ? data.password : "" 

  if(validator.isEmpty(data.email)){
    errors.email = 'email不能为空'
  }
  if(!validator.isEmail(data.email)){
    errors.email = 'email不合法'
  }
  if(validator.isEmpty(data.password)){
    errors.password = 'password不能为空'
  }

  return {
    errors,
    isValid : isEmpty(errors)
  }
}
