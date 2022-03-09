const express = require("express");
const router = express.Router();

// self-defined utility helper functions
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
// actual mongoose models
const Brand = require("../models/Brand");
// Joi schema
const { brandSchema } = require("../utils/validationSchema");

// our own middleware to verify logged in
const { isLoggedIn } = require("../middleware/isLoggedIn");

// Custom error message from validating by Joi
const validateBrand = (req, res, next) => {
  const { error } = brandSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// -----------------------------------------------

router.get("/", isLoggedIn, async (req, res) => {
  const brands = await Brand.find({});
  res.render("internal/brands/index", { brands });
});

router.get(
  "/:id", isLoggedIn, 
  catchAsync(async (req, res) => {
    const brand = await Brand.findById(req.params.id).populate("contact");
    if (!brand) {
      req.flash("error", "Cannot find that brand!");
      return res.redirect("/brands");
    }
    res.render("internal/brands/brand", { brand });
  })
);

router.get(
  "/:id/edit", isLoggedIn,
  catchAsync(async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      req.flash("error", "Cannot find that brand!");
      return res.redirect("/brands");
    }
    res.render("internal/brands/edit", { brand });
  })
);

router.put(
  "/:id", isLoggedIn,
  validateBrand,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const brand = await Brand.findByIdAndUpdate(
      id,
      { ...req.body.brand },
      { runValidators: true }
    );
    req.flash("success", "Successfully updated brand information!");
    res.redirect(`/brands/${brand._id}`);
  })
);

router.post(
  "/", isLoggedIn, 
  validateBrand,
  catchAsync(async (req, res, next) => {
    const brand = new Brand(req.body.brand);
    await brand.save();
    req.flash("success", "Successfully created a new brand!");
    res.redirect(`/brands/${brand._id}`);
  })
);

router.delete(
  "/:id", isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Brand.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted a brand!");
    res.redirect(`/brands`);
  })
);

module.exports = router;
