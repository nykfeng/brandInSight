// need cloudinary function to delete and modify file on it
const { cloudinary } = require("../cloudinary");

module.exports.leadershipFileRename = async function (brand, file) {
  let url = file.path;
  let filename = file.filename;

  const newUrl = url.replace(
    "leadershipProfilePicture",
    `brands/${brand._id}/leadershipProfilePicture`
  );
  const newFilename = filename.replace(
    "leadershipProfilePicture",
    `brands/${brand._id}/leadershipProfilePicture`
  );

  await cloudinary.uploader.rename(
    filename,
    newFilename,
    function (error, result) {
      console.log(result, error);
    }
  );

  return { url: newUrl, filename: newFilename}
}

