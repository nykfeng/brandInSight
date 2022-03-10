const express = require("express");

// option is necessary for Router here because
// this route is "/brands/:id/contact"
// by default it doesn't have access to the brand:id params
const router = express.Router({ mergeParams: true });

// self-defined utility helper functions
const catchAsync = require("../utils/catchAsync");

// actual mongoose models
const Brand = require("../models/Brand");
const Contact = require("../models/Contact");

// validation with Joi schema
const { validateContact } = require("../middleware/validateData");

router.post(
  "/",
  validateContact,
  catchAsync(async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    const contact = new Contact(req.body.contact);
    brand.contact.push(contact);
    await contact.save();
    await brand.save();
    req.flash("success", "Successfully created a new contact!");
    res.redirect(`/brands/${brand._id}`);
  })
);

router.delete(
  "/:contactId",
  catchAsync(async (req, res) => {
    const { id, contactId } = req.params;
    await Brand.findByIdAndUpdate(id, { $pull: { contact: contactId } });
    await Contact.findByIdAndDelete(contactId);
    req.flash("success", "Successfully deleted a contact!");
    res.redirect(`/brands/${id}`);
  })
);

module.exports = router;
