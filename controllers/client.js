// actual mongoose models
const Contact = require("../models/Contact");
const Brand = require("../models/Brand");

module.exports.renderHome = async (req, res, next) => {
  res.render("client/home");
};

module.exports.getBrandById = async (req, res, next) => {
  res.render("client/brand");
};
