// actual mongoose models
const Contact = require("../models/Contact");
const Brand = require("../models/Brand");

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
    const id = '623545d55a3d7c711c5cfccc';
    const brand = await Brand.findById(id);
//   const brand = await Brand.find({}).populate('Contact');
  res.render("internal/brands/brandPage", {brand});
};
