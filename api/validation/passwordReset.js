const Validator = require('validator');
const isEmpty = require('./functions'); 

module.exports = function validatePasswordResetInput(data, stage = 'request') {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.authCode = !isEmpty(data.authCode) ? data.authCode : '';

  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if(stage === 'auth') {
    if(Validator.isEmpty(data.authCode)) {
      errors.authCode = 'Auth Code is required';
    } else if(data.authCode.length !== 4) {
      errors.authCode = 'Auth Code is invalid';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };

}