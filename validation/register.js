const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateRegisterInput (data) {
  let errors = {}
  data.name = !isEmpty(data.name) ? data.name : "" 
  data.email = !isEmpty(data.email) ? data.email : "" 
  data.password = !isEmpty(data.password) ? data.password : "" 

  if(!validator.isLength(data.name, {min: 3,max: 20})) {
    errors.name = 'name长度在2-20之间'
  }
  if(validator.isEmpty(data.name)){
    errors.name = '名字不能为空'
  }
  if(validator.isEmpty(data.email)){
    errors.email = 'email不能为空'
  }
  if(!validator.isEmail(data.email)){
    errors.email = 'email不合法'
  }
  if(validator.isEmpty(data.password)){
    errors.password = 'password不能为空'
  }
  if(!validator.equals(data.password,data.password2)){
    errors.password = 'password不一致'
  }
  return {
    errors,
    isValid : isEmpty(errors)
  }
}
