const Validator = require('validator');
const isEmpty = require('./functions'); 

module.exports = function validateResetRequestInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.authCode = !isEmpty(data.authCode) ? data.authCode : '';

  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  // if(Validator.isEmpty(data.authCode)) {
  //   errors.authCode = 'Auth Code is required';
  // }

  // if(data.authCode.length < 4) {
  //   errors.authCode = 'Auth Code is invalid';
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };

}