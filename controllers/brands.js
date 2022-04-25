// actual mongoose models
const Brand = require("../models/Brand");
// need cloudinary function to delete file on it
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
  const brands = await Brand.find({});
  res.render("internal/brands/index", { brands });
};

module.exports.renderAddForm = async (req, res) => {
  res.render("internal/brands/new");
};

// get a list of trending brands
module.exports.trending = async (req, res) => {
  // some algorithm to determine trending

  // setting option for pagination
  const options = {
    page: 1,
    limit: 5,
  };

  // paginate is not built in, using mongoose-paginate-v2 here
  const brands = await Brand.paginate({}, options);
  res.send( brands );
};

// get a list of search result by string
module.exports.searching = async (req, res) => {
  // the query is named term
  const term = req.query.term;
  // using RegEx to set it to /term/i
  const reg = new RegExp(term,"i");

  const options = {
    page: 1,
    limit: 10,
  };

  const searchResults = await Brand.paginate({ name: reg }, options);

  res.send( searchResults );
};

module.exports.add = async (req, res, next) => {
  const brand = new Brand(req.body.brand);

  if (req.file) {
    let url = req.file.path;
    let filename = req.file.filename;

    const newUrl = url.replace("logo", `brands/${brand._id}/logo`);
    const newFilename = filename.replace("logo", `brands/${brand._id}/logo`);

    await cloudinary.uploader.rename(
      filename,
      newFilename,
      function (error, result) {
        console.log(result, error);
      }
    );

    brand.logo = { url: newUrl, filename: newFilename };

    // brand.logo = { url: req.file.path, filename: req.file.filename };
  }

  await brand.save();
  req.flash("success", "Successfully created a new brand!");
  res.redirect(`/internal/brands/${brand._id}`);
};

module.exports.getById = async (req, res) => {
  const brand = await Brand.findById(req.params.id)
    .populate("contact")
    .populate("leadership");

  if (!brand) {
    req.flash("error", "Cannot find that brand!");
    return res.redirect("/brands");
  }
  res.render("internal/brands/brandPage", { brand });
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

  if (req.file) {
    if (brand.logo.filename) {
      await cloudinary.uploader.destroy(brand.logo.filename);
    }
    brand.logo = { url: req.file.path, filename: req.file.filename };
    await brand.save();
  }
  req.flash("success", "Successfully updated brand information!");
  res.redirect(`/brands/${brand._id}`);
};

module.exports.deleteBrand = async (req, res) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (brand.logo.filename) {
    // must delete the logo file before the folder can be deleted
    await cloudinary.uploader.destroy(
      brand.logo.filename,
      function (error, result) {
        console.log("Cloudinary Result: ", result, "Cloudinary Error: ", error);
      }
    );

    // Delete the brand id folder that holds the logo file
    await cloudinary.api.delete_folder(
      `BrandInSight/brands/${id}`,
      function (error, result) {
        console.log("Cloudinary Result: ", result, "Cloudinary Error: ", error);
      }
    );
  }

  await brand.remove();
  req.flash("success", "Successfully deleted a brand!");
  res.redirect(`/brands`);
};
