const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "BrandInSight/logo",
    allowedFormats: ["jpeg", "jpg", "png", "gif"],
  },
});

const userProfile = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "BrandInSight/users",
    allowedFormats: ["jpeg", "jpg", "png", "gif"],
  },
});

const leadershipProfile = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "BrandInSight/leadershipProfilePicture",
    allowedFormats: ["jpeg", "jpg", "png", "gif"],
  },
});

module.exports = {
  cloudinary,
  storage,
  userProfile,
  leadershipProfile
};
