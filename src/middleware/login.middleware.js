const Joi = require('joi');
const LoginInvalidError = require('../Errors/LoginInvalidError');

const REQUIRED_MSG = 'Some required fields are missing';

const loginSchema = Joi.object({
  email: Joi.string().required().email().messages({
    'any.required': REQUIRED_MSG,
    'string.empty': REQUIRED_MSG,
  }),
  password: Joi.string().required().messages({
    'any.required': REQUIRED_MSG,
    'string.empty': REQUIRED_MSG,
  }),
});

const loginMiddleware = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    const { message } = error.details[0];
    throw new LoginInvalidError(message);
  }
  next();
};

module.exports = loginMiddleware;