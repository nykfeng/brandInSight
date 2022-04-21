// actual mongoose models
const Contact = require("../models/Contact");
const Brand = require("../models/Brand");

module.exports.renderHome = async (req, res, next) => {
  res.render("client/home");
};

module.exports.getBrandById = async (req, res, next) => {
  const brand = await Brand.findById(req.params.id)
    .populate("contact")
    .populate("leadership");
    
  if (!brand) {
    req.flash("error", "Cannot find that brand!");
    return res.redirect("/brands");
  }
  res.render("client/brand", { brand });
};
