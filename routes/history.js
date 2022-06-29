const express = require("express");
const router = express.Router();

// self-defined utility helper functions
const catchAsync = require("../utils/catchAsync");

// our own middleware to verify logged in
const { isLoggedIn } = require("../middleware/isLoggedIn");


// contacts controller
const histories = require("../controllers/histories");

router.route("/").get(isLoggedIn, catchAsync(histories.getList));

module.exports = router;
