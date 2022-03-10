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

// -----------------------------------------------

router.get("/", isLoggedIn, async (req, res) => {
  const brands = await Brand.find({});
  res.render("internal/brands/index", { brands });
});

router.get(
  "/:id",
  isLoggedIn,
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
  "/:id/edit",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (!brand) {
      req.flash("error", "Cannot find that brand!");
      return res.redirect("/brands");
    }
    res.render("internal/brands/edit", { brand });
  })
);

router.put(
  "/:id",
  isLoggedIn,
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
  "/",
  isLoggedIn,
  validateBrand,
  catchAsync(async (req, res, next) => {
    const brand = new Brand(req.body.brand);
    await brand.save();
    req.flash("success", "Successfully created a new brand!");
    res.redirect(`/brands/${brand._id}`);
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Brand.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted a brand!");
    res.redirect(`/brands`);
  })
);

module.exports = router;
