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

// controller
const brands = require("../controllers/brands");

// -----------------------------------------------

// Express offers this way of grouping routes
router
  .route("/")
  .get(isLoggedIn, catchAsync(brands.index))
  .post(isLoggedIn, validateBrand, catchAsync(brands.add));

// the /new route has to be before /:id, otherwise express takes /new as id
router.get("/new", isLoggedIn, catchAsync(brands.renderAddForm));

router
  .route("/:id")
  .get(isLoggedIn, catchAsync(brands.getById))
  .put(isLoggedIn, validateBrand, catchAsync(brands.update))
  .delete(isLoggedIn, catchAsync(brands.deleteBrand));

router.get("/:id/edit", isLoggedIn, catchAsync(brands.renderEditForm));

module.exports = router;
