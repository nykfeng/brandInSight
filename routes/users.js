const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/register", (req, res) => {
  res.send("REGISTER!~~!!!");
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

module.exports = router;
