// actual mongoose models
const Leadership = require("../models/Leadership");
const Brand = require("../models/Brand");

// new leadership 
module.exports.add = async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    const leadership = new Leadership(req.body.leadership);
    brand.leadership.push(leadership);
    leadership.brand = req.params.id; 
    await leadership.save();
    await brand.save();
    console.log(leadership);
    req.flash("success", "Successfully created a new leadership profile!");
    res.redirect(`/internal/brands/${brand._id}`);
  };