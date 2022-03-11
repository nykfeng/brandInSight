// actual mongoose models
const Brand = require("../models/Brand");

module.exports.index = async (req, res) => {
  const brands = await Brand.find({});
  res.render("internal/brands/index", { brands });
};

module.exports.renderAddForm = async (req, res) => {
  res.render("internal/brands/new");
};

module.exports.add = async (req, res, next) => {
  // const { url, filename } = req.file;
  console.log(req.body);
  console.log(req.file)
  const brand = new Brand(req.body.brand);
  brand.logo = { url: req.file.url, filename: req.file.filename}
  await brand.save();
  req.flash("success", "Successfully created a new brand!");
  res.redirect(`/brands/${brand._id}`);
};

module.exports.getById = async (req, res) => {
  const brand = await Brand.findById(req.params.id).populate("contact");
  if (!brand) {
    req.flash("error", "Cannot find that brand!");
    return res.redirect("/brands");
  }
  res.render("internal/brands/brand", { brand });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    req.flash("error", "Cannot find that brand!");
    return res.redirect("/brands");
  }
  res.render("internal/brands/edit", { brand });
};

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndUpdate(
    id,
    { ...req.body.brand },
    { runValidators: true }
  );
  req.flash("success", "Successfully updated brand information!");
  res.redirect(`/brands/${brand._id}`);
};

module.exports.deleteBrand = async (req, res) => {
  const { id } = req.params;
  await Brand.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted a brand!");
  res.redirect(`/brands`);
};
