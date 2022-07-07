const mongoose = require("mongoose");
const Contact = require("./Contact");

const Schema = mongoose.Schema; // Doing this to shorten the variable name down the line,
//since mongoose.Schema will be used a lot

// adding this plugin to use paginate
const mongoosePaginate = require('mongoose-paginate-v2');

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
    type: Number,
  },
  headquarters: {
    type: String,
  },
  description: {
    type: String,
    trim: true,
  },
  typeOfCompany: {
    isPublicCompany: {
      type: Boolean,
    },
    stockTicker: {
      type: String,
      default: "N/A",
    },
  },
  socialMedia: {
    facebook: {
      profileHandle: {
        type: String,
      },
      likes: {
        type: Number,
        min: 0,
      },
    },
    twitter: {
      profileHandle: {
        type: String,
      },
      followers: {
        type: Number,
        min: 0,
      },
    },
    linkedin: {
      profileHandle: {
        type: String,
      },
    },
  },
  industry: [{ type: String }],
  foundedDate: {
    type: Number,
  },
  founders: [{ type: String }],
  highlights: {
    acquisition: {
      type: Number,
    },
    investment: {
      type: Number,
    },
    adSpend: {
      type: Number,
    },
    contacts: {
      type: Number,
    },
  },
  logo: {
    url: String,
    filename: String,
  },
  contact: [
    {
      type: Schema.Types.ObjectId,
      ref: "Contact",
    },
  ],
  leadership: [
    {
      type: Schema.Types.ObjectId,
      ref: "Leadership",
    },
  ],
});

BrandSchema.plugin(mongoosePaginate);

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
