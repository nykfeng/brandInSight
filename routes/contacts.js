const express = require("express");

// option is necessary for Router here because
// this route is "/brands/:id/contact"
// by default it doesn't have access to the brand:id params 
const router = express.Router({ mergeParams: true }); 

// self-defined utility helper functions
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

// actual mongoose models
const Brand = require("../models/Brand");
const Contact = require("../models/Contact");

// Joi schema
const { contactSchema } = require("../utils/validationSchema");

// Custom error message from validating by Joi
const validateContact = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router.post(
  "/",
  validateContact,
  catchAsync(async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    const contact = new Contact(req.body.contact);
    brand.contact.push(contact);
    await contact.save();
    await brand.save();
    res.redirect(`/brands/${brand._id}`);
  })
);

router.delete(
  "/:contactId",
  catchAsync(async (req, res) => {
    const { id, contactId } = req.params;
    await Brand.findByIdAndUpdate(id, { $pull: { contact: contactId } });
    await Contact.findByIdAndDelete(contactId);
    res.redirect(`/brands/${id}`);
  })
);

module.exports = router;
