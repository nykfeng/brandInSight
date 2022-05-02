// actual mongoose models
const Brand = require("../models/Brand");
const Contact = require("../models/Contact");

module.exports.renderHome = async (req, res, next) => {
  res.render("client/home");
};

// For home brand list table page
module.exports.brandListPage = async (req, res) => {
  const brands = await Brand.find({});
  res.render("client/brands", { brands });
};

// For home contact list table page
module.exports.contactListPage = async (req, res) => {
  const contacts = await Contact.find({}).populate('brand');
  res.render("client/contacts", { contacts });
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
