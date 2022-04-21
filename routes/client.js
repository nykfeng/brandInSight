const express = require("express");
const router = express.Router();
// mongoose user model
const User = require("../models/User");
// self-defined utility helper functions
const catchAsync = require("../utils/catchAsync");

// our own middleware to verify logged in
const { isLoggedIn } = require("../middleware/isLoggedIn");

const passport = require("passport");

// brand controller
const brands = require("../controllers/brands");

// client controller
const client = require("../controllers/client");

router.route("/home").get(isLoggedIn, client.renderHome);

router.route("/client/brands/:id").get(isLoggedIn, catchAsync(client.getBrandById));

module.exports = router;
