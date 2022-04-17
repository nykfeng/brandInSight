// Joi schema
const { brandSchema, contactSchema, brandHighlightsSchema, leadershipSchema } = require("./validationSchema");

// self-defined error handler functions
const ExpressError = require("../utils/ExpressError");

// Custom error message from validating by Joi
module.exports.validateBrand = (req, res, next) => {
  // console.log("req.body.brand");
  // console.log(req.body);
  // console.log("----------------------------");
  // console.log(req.file);

  const { error } = brandSchema.validate(req.body);

  if (error) {
    console.log('brandSchema error by JOI ---')
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateBrandHighlights = (req, res, next)=> {
  const { error } = brandHighlightsSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
}

// Custom error message from validating by Joi
module.exports.validateContact = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);

  console.log('Error in Joi, req body is ---------------------');
  console.log(req.body);

  if (error) {
    console.log('brandSchema error by JOI ---')
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// Custom error message from validating by Joi
module.exports.validateLeadership = (req, res, next) => {
  const { error } = leadershipSchema.validate(req.body);

  console.log('Error in Joi, req body is ---------------------');
  console.log(error);
  console.log(req.body);

  if (error) {
    console.log('brandSchema error by JOI ---')
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
