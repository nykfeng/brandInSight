const express = require("express");
const router = express.Router();
// mongoose user model
const User = require("../models/User");
// self-defined utility helper functions
const catchAsync = require("../utils/catchAsync");

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

router.get("/logout", users.logout);

module.exports = router;
