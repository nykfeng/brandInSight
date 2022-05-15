const express = require("express");
const router = express.Router();

// self-defined utility helper functions
const catchAsync = require("../utils/catchAsync");

// actual mongoose models
const Brand = require("../models/Brand");

// our own middleware to verify logged in
const { isLoggedIn } = require("../middleware/isLoggedIn");

// validation with Joi schema
const { validateBrand } = require("../middleware/validateData");
const { validateBrandHighlights } = require("../middleware/validateData");

// controller
const brands = require("../controllers/brands");
const internal = require("../controllers/internal");

// for handling image -- logo
const multer = require("multer");
const { storage } = require("../cloudinary"); // Node will automatically look for index.js
const upload = multer({ storage });

router.route("/").get(isLoggedIn, catchAsync(internal.index));


router
  .route("/brands/:id")
  .get(isLoggedIn, catchAsync(internal.brandEdit))
  .put(
    isLoggedIn,
    upload.single("logo"),
    validateBrand,
    catchAsync(internal.brandUpdate)
  )
  .delete(isLoggedIn, catchAsync(internal.deleteBrand));

router
  .route("/brands/highlights/:id")
  .put(
    isLoggedIn,
    validateBrandHighlights,
    catchAsync(internal.brandHighlightsUpdate)
  );

module.exports = router;
