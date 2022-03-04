const Joi = require('joi');

const brandSchema = Joi.object({
    brand: Joi.object({
      name: Joi.string().required(),
      employee: {
        min: Joi.number().min(0),
        max: Joi.number(),
      },
      headquarters: Joi.string(),
      website: Joi.string().allow(""),
      description: Joi.string().allow(""),
    }).required(),
  });

  module.exports = {
      brandSchema
  }