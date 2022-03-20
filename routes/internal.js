const express = require("express");
const router = express.Router();

// self-defined utility helper functions
const catchAsync = require("../utils/catchAsync");

// actual mongoose models
const Brand = require("../models/Brand");

// our own middleware to verify logged in
const { isLoggedIn } = require("../middleware/isLoggedIn");

// controller
const brands = require("../controllers/brands");
const internal = require("../controllers/internal");


router.route('/').get(isLoggedIn, catchAsync(internal.index))

router.route('/new').get(isLoggedIn, catchAsync(internal.renderNewBrandForm))

router.route('/brands/:id').get(isLoggedIn, catchAsync(internal.brandEdit))

module.exports = router;