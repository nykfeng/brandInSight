const Joi = require("joi");
const myCustomJoi = Joi.extend(require("joi-phone-number"));

const brandSchema = Joi.object({
  brand: Joi.object({
    name: Joi.string().required(),
    employee: Joi.number().min(0).allow("").optional(),
    headquarters: Joi.string().allow(""),
    website: Joi.string().allow(""),
    description: Joi.string().allow(""),
    typeOfCompany: {
      isPublicCompany: Joi.boolean().allow(""),
      stockTicker: Joi.string().allow(""),
    },
    socialMedia: {
      facebook: {
        profileHandle: Joi.string().allow(""),
        likes: Joi.number().min(0).allow("").optional(),
      },
      twitter: {
        profileHandle: Joi.string().allow(""),
        followers: Joi.number().min(0).allow("").optional(),
      },
      linkedin: {
        profileHandle: Joi.string().allow(""),
      },
    },
    industry: [Joi.string().allow("")],
    foundedDate: Joi.number().min(1900).allow("").optional(),
    founders: [Joi.string().allow("")],
    highlights: {
      acquisition: Joi.number().min(0).allow("").optional(),
      investment: Joi.number().min(0).allow("").optional(),
      adSpend: Joi.number().min(0).allow("").optional(),
      contacts: Joi.number().min(0).allow("").optional(),
    },
    logo: {
      url: Joi.string().allow(""),
      filename: Joi.string().allow(""),
    },
  }).required(),
});

const brandHighlightsSchema = Joi.object({
  brand: Joi.object({
    highlights: {
      acquisition: Joi.number().min(0).allow("").optional(),
      investment: Joi.number().min(0).allow("").optional(),
      adSpend: Joi.number().min(0).allow("").optional(),
      contacts: Joi.number().min(0).allow("").optional(),
    },
  }),
});

const contactSchema = Joi.object({
  contact: Joi.object({
    name: Joi.string().required(),
    position: Joi.string().required(),
    rank: Joi.string(),
    phoneNumber: Joi.string(),
    email: Joi.string().email(),
    location: Joi.string(),
    linkedin: Joi.string(),
  }).required(),
});

module.exports = {
  brandSchema,
  contactSchema,
  brandHighlightsSchema,
};
