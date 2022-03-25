const express = require("express");

// option is necessary for Router here because
// this route is "/brands/:id/contact"
// by default it doesn't have access to the brand:id params
const router = express.Router({ mergeParams: true });

// self-defined utility helper functions
const catchAsync = require("../utils/catchAsync");

// our own middleware to verify logged in
const { isLoggedIn } = require("../middleware/isLoggedIn");

// validation with Joi schema
const { validateContact } = require("../middleware/validateData");

// contacts controller
const contacts = require("../controllers/contacts");

router.post("/", isLoggedIn, validateContact, catchAsync(contacts.add));

router
  .delete("/:contactId", isLoggedIn, catchAsync(contacts.deleteContact))
  .put("/:contactId", isLoggedIn, catchAsync(contacts.edit));

module.exports = router;
