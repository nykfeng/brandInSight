const baseJoi = require("joi");
// const myCustomJoi = Joi.extend(require("joi-phone-number"));
const sanitizeHtml = require("sanitize-html");

const extension = (joi)=> ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.escapeHTML' : '{{#label}} must not include HTML'
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value) return helpers.error('string.escapeHTML', { value })
        return clean;
      }
    }
  }
});

const Joi = baseJoi.extend(extension);

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
    phoneNumber: Joi.string().allow(""),
    email: Joi.string().email().allow(""),
    location: Joi.string().allow(""),
    linkedin: Joi.string().allow(""),
  }).required(),
});

const leadershipSchema = Joi.object({
  leadership: Joi.object({
    name: Joi.string().required(),
    position: Joi.string().required(),
    profilePicture: {
      url: Joi.string().allow(""),
      filename: Joi.string().allow(""),
    },
  }),
});

const historySchema = Joi.object({
  history: Joi.object({
    action: Joi.string().required(),
    date: Joi.date().required(),
  }),
});

module.exports = {
  brandSchema,
  contactSchema,
  brandHighlightsSchema,
  leadershipSchema,
  historySchema,
};
