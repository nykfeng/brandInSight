// mongoose models
const History = require("../models/History");

// For home brand list table page
module.exports.getList = async (req, res) => {
  const histories = await History.find({});
  res.send();
};
