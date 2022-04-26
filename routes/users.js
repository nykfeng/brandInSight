const express = require("express");
const router = express.Router();
// mongoose user model
const User = require("../models/User");

// our own middleware to verify logged in
const { isLoggedIn } = require("../middleware/isLoggedIn");

// self-defined utility helper functions
const catchAsync = require("../utils/catchAsync");

// for handling image -- leadership profile picture
const multer = require("multer");
const { userProfile } = require("../cloudinary"); // Node will automatically look for index.js
const upload = multer({ storage: userProfile });

const passport = require("passport");

// users controller
const users = require("../controllers/users");

router
  .route("/register")
  .get(users.renderRegister)
  .post(catchAsync(users.register));


router
  .route("/login")
  .get(users.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.login
  );
// You can use other strategy here as well, like Google, twitter account instead of local

// Access and edit user data
router
  .route("/user/:id")
  .get(isLoggedIn, catchAsync(users.access))
  .put(isLoggedIn, upload.single("userProfile"), catchAsync(users.edit))
  .delete();

router.get("/logout", users.logout);

module.exports = router;
