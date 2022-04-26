const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  subscribedBrands: [{ type: String }],
  viewedBrandHistory: [{ type: String }],
  profilePicture: {
    url: String,
    filename: String,
  },
});

// plugin is a mongoose tool for reusing logic in multiple schemas
// adding passportLocalMongoose as plugin will automatically
// create the username and password schema fields, and additional methods
// passport also makes sure username is unique
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
