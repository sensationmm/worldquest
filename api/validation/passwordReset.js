const Validator = require('validator');
const isEmpty = require('./functions'); 

module.exports = function validatePasswordResetInput(data, stage = 'request') {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.authCode = !isEmpty(data.authCode) ? data.authCode : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

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

  if(stage === 'newPass') {
    if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = 'Password must be at least 6 characters';
    }

    if(Validator.isEmpty(data.password)) {
      errors.password = 'Password is required';
    }

    if(Validator.isEmpty(data.password2)) {
      errors.password2 = 'Confirm password is required';
    } else if(!Validator.equals(data.password, data.password2)) {
      errors.password2 = 'Passwords must match';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };

}