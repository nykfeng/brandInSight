// mongoose models
const History = require("../models/History");

// For home brand list table page
module.exports.getList = async (req, res) => {
  const histories = await History.find({})
    .populate("user")
    .populate("brand")
    .populate("contact")
    .populate("leadership");

  const historySimplied = [];
  histories.forEach((history) => {
    const module = history[history.module.toLowerCase()]
      ? history[history.module.toLowerCase()].name
      : history.module;

    if (module === "Searched") module = history.searchTerm;

    historySimplied.push({
      username: history.user.username,
      action: history.action,
      module,
      date: history.date,
    });
  });

  res.send(historySimplied);
};
