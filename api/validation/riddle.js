const Validator = require("validator");
const isEmpty = require("./functions");

module.exports = function validateRiddleInput(data) {
  let errors = {};

  data.question = !isEmpty(data.question) ? data.question : "";
  data.answer = !isEmpty(data.answer) ? data.answer : "";

  if (Validator.isEmpty(data.question)) {
    errors.question = "Question is required";
  }

  if (Validator.isEmpty(data.answer)) {
    errors.answer = "Answer is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
