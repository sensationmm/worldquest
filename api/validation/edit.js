const Validator = require('validator');
const isEmpty = require('./functions'); 

module.exports = function validateEditInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';

  if(Validator.isEmpty(data.name)) {
    errors.name = 'Name is required';
  }

  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };

}