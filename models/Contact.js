const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  rank: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  yearsOfExperience: {
    type: Number,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
