import Joi = require('joi');

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required()
    .messages({
      'string.empty': 'All fields must be filled',
      'string.email': 'Incorrect email or password',
    }),
  password: Joi.string().min(6).required()
    .messages({
      'string.empty': 'All fields must be filled',
      'string.min': 'Incorrect email or password',
    }),
});

export default loginSchema;
