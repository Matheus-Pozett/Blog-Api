const Joi = require('joi');
const UserError = require('../Errors/UserError');

const userJoiSchema = Joi.object({
  displayName: Joi.string().required().min(8),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  image: Joi.string(),
});

const userMiddleware = (req, res, next) => {
  const { error } = userJoiSchema.validate(req.body);

  if (error) {
    const { message } = error.details[0];
    throw new UserError(message, 400);
  }

  next();
};

module.exports = userMiddleware;