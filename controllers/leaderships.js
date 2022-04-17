// actual mongoose models
const Leadership = require("../models/Leadership");
const Brand = require("../models/Brand");

// need cloudinary function to delete and modify file on it
const { cloudinary } = require("../cloudinary");

// new leadership
module.exports.add = async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  const leadership = new Leadership(req.body.leadership);
  brand.leadership.push(leadership);
  leadership.brand = req.params.id;

  if (req.file) {
    let url = req.file.path;
    let filename = req.file.filename;

    const newUrl = url.replace("leadershipProfilePicture", `brands/${brand._id}/leadershipProfilePicture`);
    const newFilename = filename.replace("leadershipProfilePicture", `brands/${brand._id}/leadershipProfilePicture`);

    await cloudinary.uploader.rename(
      filename,
      newFilename,
      function (error, result) {
        console.log(result, error);
      }
    );

    leadership.profilePicture = { url: newUrl, filename: newFilename };
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
  const leadership = await Leadership.findByIdAndUpdate(
    leadershipId,
    { ...req.body.leadership },
    { runValidators: true }
  );

  await leadership.save();
  req.flash("success", "Successfully updated leadership information!");
  res.redirect(`/internal/brands/${id}`);
};

// Delete leadership data
module.exports.deleteLeadership = async (req, res) => {
  const { id, leadershipId } = req.params;
  await Brand.findByIdAndUpdate(id, { $pull: { leadership: leadershipId } });
  await Leadership.findByIdAndDelete(leadershipId);
  req.flash("success", "Successfully deleted the leadership data!");
  res.redirect(`/internal/brands/${id}`);
};
