// actual mongoose models
const Leadership = require("../models/Leadership");
const Brand = require("../models/Brand");

// util function to edit cloudinary file path
const { leadershipFileRename } = require("../utils/cloudinaryRename");

// need cloudinary function to delete and modify file on it
const { cloudinary } = require("../cloudinary");

// new leadership
module.exports.add = async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  const leadership = new Leadership(req.body.leadership);
  brand.leadership.push(leadership);
  leadership.brand = req.params.id;

  // if a file was uploaded, add to cloudinary and database with path
  if (req.file) {
    // const { filename, newUrl, newFilename } =
    //   leadershipFileRename(brand, req.file);

    // await cloudinary.uploader.rename(
    //   filename,
    //   newFilename,
    //   function (error, result) {
    //     console.log(result, error);
    //   }
    // );

    leadership.profilePicture = await leadershipFileRename(brand, req.file);
  }

  await leadership.save();
  await brand.save();
  console.log(leadership);
  req.flash("success", "Successfully created a new leadership profile!");
  res.redirect(`/internal/brands/${brand._id}`);
};

// Edit the leadership data
module.exports.edit = async (req, res) => {
  const { id, leadershipId } = req.params;
  const brand = await Brand.findById(id);
  const leadership = await Leadership.findByIdAndUpdate(
    leadershipId,
    { ...req.body.leadership },
    { runValidators: true }
  );

  // Delete the old profile picture from cloudinary
  if (req.file) {
    if (leadership.profilePicture.filename) {
      await cloudinary.uploader.destroy(leadership.profilePicture.filename);
    }

    // Now update the new cloudinary file path to database
    leadership.profilePicture = await leadershipFileRename(brand, req.file);
  }

  await leadership.save();
  req.flash("success", "Successfully updated leadership information!");
  res.redirect(`/internal/brands/${id}`);
};

// Delete leadership data
module.exports.deleteLeadership = async (req, res) => {
  const { id, leadershipId } = req.params;

  console.log("brand id: ", id);
  console.log("leadership id: ", leadershipId);

  await Brand.findByIdAndUpdate(id, { $pull: { leadership: leadershipId } });
  // delete file on Cloudinary
  const leadership = await Leadership.findById(leadershipId);
  if (leadership.profilePicture.filename) {
    await cloudinary.uploader.destroy(leadership.profilePicture.filename);
  }
  await Leadership.findByIdAndDelete(leadershipId);
  req.flash("success", "Successfully deleted the leadership data!");
  res.redirect(`/internal/brands/${id}`);
};
