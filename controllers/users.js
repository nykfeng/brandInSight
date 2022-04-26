const User = require("../models/User");

module.exports.renderRegister = (req, res) => {
  res.render("authen/signup");
};

module.exports.register = async (req, res, next) => {
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
};

module.exports.renderLogin = (req, res) => {
  res.render("authen/login");
};

module.exports.login = (req, res) => {
  req.flash("success", `Welcome back!`);
  // returnTo is define in isLoggedIn
  const redirectUrl = req.session.returnTo || "/home";
  delete req.session.returnTo; // after it has been return to, delete the original
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout();

  req.flash("success", "Goodbye");
  res.redirect("/");
};


// get user information
module.exports.access = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.render(`authen/user`, {user});
}