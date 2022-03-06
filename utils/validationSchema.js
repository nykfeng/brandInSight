const Joi = require("joi");
const myCustomJoi = Joi.extend(require("joi-phone-number"));

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

const contactSchema = Joi.object({
  contact: Joi.object({
    name: Joi.string().required(),
    position: Joi.string().required(),
    rank: Joi.string(),
    phoneNumber: Joi.string(),
    // phoneNumber: myCustomJoi.string().phoneNumber().validate("7777777777"),
    email: Joi.string().email(),
    yearsOfExperience: Joi.number().integer().min(0),
  }).required(),
});

module.exports = {
  brandSchema,
  contactSchema,
};
