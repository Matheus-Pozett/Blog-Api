const Joi = require('joi');
const PostError = require('../Errors/PostError');

const postJoiSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'Some required fields are missing',
    'string.empty': 'Some required fields are missing',
  }),
  content: Joi.string().required().messages({
    'any.required': 'Some required fields are missing',
  }),
  categoryIds: Joi.array().min(1).messages({
    'array.min': 'one or more "categoryIds" not found',
  }),
});

const postMiddleware = (req, res, next) => {
  const { error } = postJoiSchema.validate(req.body);

  if (error) {
    const { message } = error.details[0];
    throw new PostError(message);
  }

  next();
};

module.exports = postMiddleware;