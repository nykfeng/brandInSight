// Joi schema
const { brandSchema, contactSchema } = require("./validationSchema");

// self-defined error handler functions
const ExpressError = require("../utils/ExpressError");

// Custom error message from validating by Joi
module.exports.validateBrand = (req, res, next) => {
  const { error } = brandSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// Custom error message from validating by Joi
module.exports.validateContact = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
