const User = require("../models/User");
const Brand = require("../models/Brand");
const Contact = require("../models/Contact");

// need cloudinary function to delete and modify file on it
const { cloudinary } = require("../cloudinary");

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
  res.render(`authen/user`, { user });
};

// Edit user information
module.exports.edit = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  user.firstName = req.body.user.firstName;
  user.lastName = req.body.user.lastName;

  if (req.file) {
    if (user.profilePicture.filename) {
      await cloudinary.uploader.destroy(user.profilePicture.filename);
    }
    user.profilePicture = { url: req.file.path, filename: req.file.filename };
  }

  await user.save();

  req.flash("success", "Successfully updated your profile!");
  res.redirect(`/user/${id}`);
};

// User adding subscribed brands to profile
module.exports.addBrandSubscription = async (req, res) => {
  // Getting brand id to add to subscribed
  const { id } = req.body;
  const userId = req.params.id;

  const user = await User.findById(userId);
  const brand = await Brand.findById(id);

  user.subscribedBrands.push(brand);

  await user.save();
};

// User unsubscribed brands from profile
module.exports.deleteBrandSubscription = async (req, res) => {
  // Getting brand id to delete
  const { id } = req.body;
  const userId = req.params.id;

  await User.findByIdAndUpdate(userId, { $pull: { subscribedBrands: id } });
};

// User saving contacts to profile
module.exports.saveContact = async (req, res) => {
  // Getting contact id to save
  const { id } = req.body;
  const userId = req.params.id;

  const user = await User.findById(userId);
  const contact = await Contact.findById(id);

  user.savedContacts.push(contact);
  await user.save();
};

// User unsave contact from profile
module.exports.unsaveContact = async (req, res) => {
  // Getting brand id to delete
  const { id } = req.body;
  const userId = req.params.id;

  await User.findByIdAndUpdate(userId, { $pull: { savedContacts: id } });
};

// user profile page for viewing subscribed brands and saved contacts
// ------------------------------------------------------------------
module.exports.profile = async (req, res) => {
  await req.user.populate(["subscribedBrands", "savedContacts"]);

  res.render("authen/profile");
};
