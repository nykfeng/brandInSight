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
    name: Joi.string().required().escapeHTML(),
    employee: Joi.number().min(0).allow("").optional(),
    headquarters: Joi.string().allow("").escapeHTML(),
    website: Joi.string().allow("").escapeHTML(),
    description: Joi.string().allow("").escapeHTML(),
    typeOfCompany: {
      isPublicCompany: Joi.boolean().allow(""),
      stockTicker: Joi.string().allow("").escapeHTML(),
    },
    socialMedia: {
      facebook: {
        profileHandle: Joi.string().allow("").escapeHTML(),
        likes: Joi.number().min(0).allow("").optional(),
      },
      twitter: {
        profileHandle: Joi.string().allow("").escapeHTML(),
        followers: Joi.number().min(0).allow("").optional(),
      },
      linkedin: {
        profileHandle: Joi.string().allow("").escapeHTML(),
      },
    },
    industry: [Joi.string().allow("").escapeHTML()],
    foundedDate: Joi.number().min(1900).allow("").optional(),
    founders: [Joi.string().allow("").escapeHTML()],
    highlights: {
      acquisition: Joi.number().min(0).allow("").optional(),
      investment: Joi.number().min(0).allow("").optional(),
      adSpend: Joi.number().min(0).allow("").optional(),
      contacts: Joi.number().min(0).allow("").optional(),
    },
    logo: {
      url: Joi.string().allow("").escapeHTML(),
      filename: Joi.string().allow("").escapeHTML(),
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
    name: Joi.string().required().escapeHTML(),
    position: Joi.string().required().escapeHTML(),
    rank: Joi.string().escapeHTML(),
    phoneNumber: Joi.string().allow("").escapeHTML(),
    email: Joi.string().email().allow("").escapeHTML(),
    location: Joi.string().allow("").escapeHTML(),
    linkedin: Joi.string().allow("").escapeHTML(),
  }).required(),
});

const leadershipSchema = Joi.object({
  leadership: Joi.object({
    name: Joi.string().required().escapeHTML(),
    position: Joi.string().required().escapeHTML(),
    profilePicture: {
      url: Joi.string().allow("").escapeHTML(),
      filename: Joi.string().allow("").escapeHTML(),
    },
  }),
});

const historySchema = Joi.object({
  history: Joi.object({
    action: Joi.string().required().escapeHTML(),
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
