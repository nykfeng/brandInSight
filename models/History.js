const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
  },
  contact: {
    type: Schema.Types.ObjectId,
    ref: "Contact",
  },
  leadership: {
    type: Schema.Types.ObjectId,
    ref: "Leadership",
  },
  action: {
    type: String,
  },
  date: {
    type: Date,
  },
  searchTerm : {
    type: String,
  }
});

module.exports = mongoose.model("History", historySchema);
