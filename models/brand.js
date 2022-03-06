const mongoose = require("mongoose");
const Contact = require("./Contact");
const Schema = mongoose.Schema; // Doing this to shorten the variable name down the line,
//since mongoose.Schema will be used a lot

const BrandSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  employee: {
    min: { type: Number, min: 0 },
    max: { type: Number, min: 0 },
  },
  headquarters: {
    type: String,
  },
  description: {
    type: String,
    trim: true,
  },
  contact: [
    {
      type: Schema.Types.ObjectId,
      ref: "Contact",
    },
  ],
});

// Mongoose middleware to delete contacts after brand was deleted

BrandSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Contact.deleteMany({
      _id: {
        $in: doc.contact,
      },
    });
  }
});

module.exports = mongoose.model("Brand", BrandSchema);
