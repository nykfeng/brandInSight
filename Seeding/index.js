const express = require("express");
const { default: mongoose } = require("mongoose");
const Brand = require("../models/Brand");

mongoose.connect("mongodb://localhost:27017/brandInSight", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  // await Brand.deleteMany({});

  const data = require("../Seeding/brands.json");

  data.forEach(brand=> {
      const b = new Brand(brand);
      b.save();
  })
};

seedDB();
