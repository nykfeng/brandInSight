module.exports.ifLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.redirect("/home");
    }
    next();
  };
  