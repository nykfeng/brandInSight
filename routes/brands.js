const express = require("express");
const router = express.Router();

// self-defined utility helper functions
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
// actual mongoose models
const Brand = require("../models/Brand");
// Joi schema
const { brandSchema } = require("../utils/validationSchema");

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

router.get("/", async (req, res) => {
  const brands = await Brand.find({});
  res.render("internal/brands/index", { brands });
});

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const brand = await Brand.findById(req.params.id).populate("contact");
    res.render("internal/brands/brand", { brand });
  })
);

router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    res.render("internal/brands/edit", { brand });
  })
);

router.put(
  "/:id",
  validateBrand,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const brand = await Brand.findByIdAndUpdate(
      id,
      { ...req.body.brand },
      { runValidators: true }
    );
    res.redirect(`/brands/${brand._id}`);
  })
);

router.post(
  "/",
  validateBrand,
  catchAsync(async (req, res, next) => {
    const brand = new Brand(req.body.brand);
    await brand.save();
    res.redirect("/brands");
  })
);
router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Brand.findByIdAndDelete(id);
    res.redirect(`/brands`);
  })
);

module.exports = router;
