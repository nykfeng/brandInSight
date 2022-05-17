// actual mongoose models
const Contact = require("../models/Contact");
const Brand = require("../models/Brand");
const Leadership = require("../models/Leadership");
const History = require("../models/History");

// need cloudinary function to delete file on it
const { cloudinary } = require("../cloudinary");

// internal home/index page
module.exports.index = async (req, res) => {
  const brands = await Brand.find({});
  res.render("internal/index", { brands });
};

// // render new brand page to create a brand
// module.exports.renderNewBrandForm = async (req, res) => {
//   res.render("internal/brands/new");
// };

// ************************ CRUD ********************************
// ----- Add route ------
module.exports.add = async (req, res) => {
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

  // after the brand is saved, write it to history
  const history = new History({
    user: req.user,
    action: "Added",
    module: "Brand",
    brand,
    date: new Date(),
  });
  await history.save();

  req.flash("success", "Successfully created a new brand!");
  res.redirect(`/internal/brands/${brand._id}`);
};

// render brand edit page with all brand information
module.exports.brandEdit = async (req, res) => {
  // const id = "623545d55a3d7c711c5cfccc";
  const { id } = req.params;
  const brand = await Brand.findById(id)
    .populate("contact")
    .populate("leadership");

  res.render("internal/brands/brand", { brand });
};

// Update brand information
module.exports.brandUpdate = async (req, res) => {
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
  }
  await brand.save();

  // after the brand is saved, write it to history
  const history = new History({
    user: req.user,
    action: "Edited",
    module: "Brand",
    brand,
    date: new Date(),
  });
  await history.save();

  req.flash("success", "Successfully updated brand information!");
  res.redirect(`/internal/brands/${brand._id}`);
};

// update brand highlight information
module.exports.brandHighlightsUpdate = async (req, res) => {
  const { id } = req.params;

  const brand = await Brand.findByIdAndUpdate(
    id,
    { ...req.body.brand },
    { runValidators: true }
  );

  await brand.save();

  // after the brand is saved, write it to history
  const history = new History({
    user: req.user,
    action: "Edited",
    module: "Brand",
    brand,
    date: new Date(),
  });
  await history.save();

  req.flash("success", "Successfully updated brand information!");
  res.redirect(`/internal/brands/${id}`);
};

// delete the whole brand
module.exports.deleteBrand = async (req, res) => {
  const { id } = req.params;
  const brand = await Brand.findById(id).populate();

  // Delete logo file on Cloudinary
  if (brand.logo.filename) {
    // must delete the logo file before the folder can be deleted
    await cloudinary.uploader.destroy(
      brand.logo.filename,
      function (error, result) {
        console.log("Cloudinary Result: ", result, "Cloudinary Error: ", error);
      }
    );

    // Delete the brand id folder that holds the logo file
    // await cloudinary.api.delete_folder(
    //   `BrandInSight/brands/${id}`,
    //   function (error, result) {
    //     console.log("Cloudinary Result: ", result, "Cloudinary Error: ", error);
    //   }
    // );
  }

  // Delete leadership files on Cloudinary and documents in database
  if (brand.leadership.length > 0) {
    for (let leadershipId of brand.leadership) {
      const leadershipDoc = await Leadership.findById(leadershipId);
      // must delete the leadership file before the folder can be deleted
      await cloudinary.uploader.destroy(
        leadershipDoc.profilePicture.filename,
        function (error, result) {
          console.log(
            "Cloudinary Result: ",
            result,
            "Cloudinary Error: ",
            error
          );
        }
      );

      await leadershipDoc.remove();
    }

    // Delete the leadership folder that holds the leadership file
    await cloudinary.api.delete_folder(
      `BrandInSight/brands/${id}/leadershipProfilePicture`,
      function (error, result) {
        console.log("Cloudinary Result: ", result, "Cloudinary Error: ", error);
      }
    );
  }

  // Delete contact documents in database+
  if (brand.contact.length > 0) {
    for (let contactId of brand.contact) {
      const contactDoc = await Contact.findById(contactId);
      await contactDoc.remove();
    }
  }

  // before the brand is removed and saved, write it to history
  const history = new History({
    user: req.user,
    action: "Removed",
    module: "Brand",
    brand,
    date: new Date(),
  });
  await history.save();

  await brand.remove();

  req.flash("success", "Successfully deleted a brand!");
  res.redirect(200, "/internal");
};
