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

// for handling image -- logo
const multer = require("multer");
const { storage } = require("../cloudinary"); // Node will automatically look for index.js
const upload = multer({ storage });

// -----------------------------------------------

// Express offers this way of grouping routes
router
  .route("/")
  .get(isLoggedIn, catchAsync(brands.index))
  .post(isLoggedIn, upload.single("logo"), validateBrand, catchAsync(brands.add));
  // .post(upload.single("logo"), (req, res) => {
  //   console.log(req.body);
  //   console.log(req.file);
  //   res.send("It's working~!");

  // });

// the /new route has to be before /:id, otherwise express takes /new as id
router.get("/new", isLoggedIn, catchAsync(brands.renderAddForm));

// a route to get a list of trending brands
router.get("/trending", isLoggedIn, catchAsync(brands.trending));


router
  .route("/:id")
  .get(isLoggedIn, catchAsync(brands.getById))
  .put(isLoggedIn, upload.single("logo"), validateBrand, catchAsync(brands.update))
  .delete(isLoggedIn, catchAsync(brands.deleteBrand));

router.get("/:id/edit", isLoggedIn, catchAsync(brands.renderEditForm));

module.exports = router;
