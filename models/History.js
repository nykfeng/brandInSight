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
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Contact",
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Leadership",
  },
  action: {
    type: String,
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model("History", historySchema);
