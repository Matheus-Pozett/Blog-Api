const Joi = require('joi');
const CategoryError = require('../Errors/CategoryError');

const categoryJoiSchema = Joi.object({
  name: Joi.string().required(),
});

const categoryMiddleware = (req, res, next) => {
  const { error } = categoryJoiSchema.validate(req.body);

  if (error) {
    const { message } = error.details[0];
    throw new CategoryError(message, 400);
  }
  next();
};

module.exports = categoryMiddleware;