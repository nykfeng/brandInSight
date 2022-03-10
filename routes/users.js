const express = require("express");
const router = express.Router();
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");

router.get("/register", (req, res) => {
  res.render("authen/signup");
});

router.post(
  "/register",
  catchAsync(async (req, res, next) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to BrandInSight!");
        res.redirect("/brands");
      });
    } catch (err) {
      //TODO still need to add the flash variable
      req.flash("error", err.message);
      res.redirect("/register");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("authen/login");
});

// You can use other strategy here as well, like Google, twitter account instead of local
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash("success", `Welcome back!`);
    // returnTo is define in isLoggedIn
    const redirectUrl = req.session.returnTo || "/home";
    delete req.session.returnTo; // after it has been return to, delete the original
    res.redirect(redirectUrl);
  }
);

router.get("/logout", (req, res) => {
  req.logout();

  req.flash("success", "Goodbye");
  res.redirect("/");
});

module.exports = router;
