const express = require("express");
const router = express.Router();

// our own middleware to verify logged in
const { isLoggedIn } = require("../middleware/isLoggedIn");
const { ifLoggedIn } = require("../middleware/ifLoggedIn");

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

// router.get("/login", isLoggedIn, client.renderHome)

router
  .route("/login")
  .get(ifLoggedIn, users.renderLogin)
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

router
  .route("/user/:id/brandSubscription")
  .post(isLoggedIn, catchAsync(users.addBrandSubscription))
  .delete(isLoggedIn, catchAsync(users.deleteBrandSubscription));

router
  .route("/user/:id/savedContacts")
  .post(isLoggedIn, catchAsync(users.saveContact))
  .delete(isLoggedIn, catchAsync(users.unsaveContact));

router
  .route("/user/brandNote/:brandId")
  .get(isLoggedIn, catchAsync(users.brandNotes));

router.get("/user-profile", isLoggedIn, catchAsync(users.profile));

router.get("/logout", users.logout);

module.exports = router;
