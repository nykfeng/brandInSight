// actual mongoose models
const Contact = require("../models/Contact");
const Brand = require("../models/Brand");

// need cloudinary function to delete file on it
const { cloudinary } = require("../cloudinary");

// internal home/index page
module.exports.index = async (req, res) => {
  const brands = await Brand.find({});
  res.render("internal/index", { brands });
};

// render new brand page to create a brand
module.exports.renderNewBrandForm = async (req, res) => {
  res.render("internal/brands/new");
};

// render brand edit page with all brand information
module.exports.brandEdit = async (req, res) => {
  const id = "623545d55a3d7c711c5cfccc";
  const brand = await Brand.findById(id);
  //   const brand = await Brand.find({}).populate('Contact');
  res.render("internal/brands/brandPage", { brand });
};

// Update brand information
module.exports.brandUpdate = async (req, res) => {
  const { id } = req.params;
  console.log("req.body.brand is - - - - - - - - ");
  console.log(req.body.brand);
  const brand = await Brand.findByIdAndUpdate(
    id,
    { ...req.body.brand },
    { runValidators: true }
  );

  if (req.file) {
    if (brand.logo.filename) {
      await cloudinary.uploader.destroy(brand.logo.filename);
    }
    brand.logo = { url: req.file.path, filename: req.file.filename };
  }
  await brand.save();
  req.flash("success", "Successfully updated brand information!");
  res.redirect(`/internal/brands/${brand._id}`);
};

// update brand highlight information
module.exports.brandHighlightsUpdate = async (req, res) => {
  const { id } = req.params;
  console.log("req.body.brand with highlights update is - - - - - - - - ");
  console.log(req.body.brand);

  const brand = await Brand.findByIdAndUpdate(
    id,
    { ...req.body.brand },
    { runValidators: true }
  );

  await brand.save();

  req.flash("success", "Successfully updated brand information!");
  res.redirect(`/internal/brands/${id}`);
};

