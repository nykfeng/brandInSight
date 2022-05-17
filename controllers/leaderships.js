// actual mongoose models
const Leadership = require("../models/Leadership");
const Brand = require("../models/Brand");
const History = require("../models/History");

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
    leadership.profilePicture = await leadershipFileRename(brand, req.file);
  }

  await leadership.save();
  await brand.save();

  // after the leadership is saved, write it to history
  const history = new History({
    user: req.user,
    action: "Added",
    module: "Leadership",
    leadership,
    date: new Date(),
  });
  await history.save();

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

  // after the leadership is saved, write it to history
  const history = new History({
    user: req.user,
    action: "Edited",
    module: "Leadership",
    leadership,
    date: new Date(),
  });
  await history.save();

  req.flash("success", "Successfully updated leadership information!");
  res.redirect(`/internal/brands/${id}`);
};

// Delete leadership data
module.exports.deleteLeadership = async (req, res) => {
  const { id, leadershipId } = req.params;

  await Brand.findByIdAndUpdate(id, { $pull: { leadership: leadershipId } });
  // delete file on Cloudinary
  const leadership = await Leadership.findById(leadershipId);
  if (leadership.profilePicture.filename) {
    await cloudinary.uploader.destroy(leadership.profilePicture.filename);
  }

  // before the leadership is removed and saved, write it to history
  const history = new History({
    user: req.user,
    action: "Removed",
    module: "Leadership",
    leadership,
    date: new Date(),
  });
  await history.save();

  await Leadership.findByIdAndDelete(leadershipId);
  req.flash("success", "Successfully deleted the leadership data!");
};
