const Joi = require("joi");

module.exports = function validateUser(request) {
  const schema = {
    email: Joi.string()
      .required()
      .email()
      .min(5)
      .max(255),
    password: Joi.string()
      .required()
      .min(5)
      .max(255)
  };

  return Joi.validate(request, schema);
};
