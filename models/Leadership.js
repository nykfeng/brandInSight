const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leadershipSchema = new Schema({
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
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
  },
  profilePicture: {
    url: String,
    filename: String,
  },
});

module.exports = mongoose.model("Leadership", leadershipSchema);
