const Joi = require("@hapi/joi");

const handleRegistrationValidation = (data) => {
  const registerSchema = Joi.object({
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/),
    password: Joi.string().required(),
  });

  return registerSchema.validate(data);
};

const handleLoginValidation = (data) => {
  const loginSchema = Joi.object({
    phone: Joi.string().length(10).pattern(/^[0-9]+$/),
    password: Joi.string().required(),
  });
  return loginSchema.validate(data);
};

module.exports.handleRegistrationValidation = handleRegistrationValidation;
module.exports.handleLoginValidation = handleLoginValidation;
