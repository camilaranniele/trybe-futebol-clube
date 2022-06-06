import Joi = require('joi');

const matchesSchema = Joi.object().keys({
  // inProgress: Joi.boolean().required(),
});

export default matchesSchema;
