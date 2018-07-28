module.exports =  isEmpty = (errors) => {
  return errors === undefined || errors === null ||
  (typeof errors === 'object' && Object.keys(errors).length === 0) || 
  (typeof errors === 'string' && errors.trim().length === 0)
}