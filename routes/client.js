const express = require("express");
const router = express.Router();
// mongoose user model
const User = require("../models/User");
// self-defined utility helper functions
const catchAsync = require("../utils/catchAsync");

// our own middleware to verify logged in
const { isLoggedIn } = require("../middleware/isLoggedIn");


// client controller
const client = require("../controllers/client");

router.route("/home").get(isLoggedIn, catchAsync(client.renderHome));
router.route("/brands").get(isLoggedIn, catchAsync(client.brandListPage));
router.route("/contacts").get(isLoggedIn, catchAsync(client.contactListPage));

router
  .route("/client/brands/:id")
  .get(isLoggedIn, catchAsync(client.getBrandById));

module.exports = router;
