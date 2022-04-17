const express = require("express");

// option is necessary for Router here because
// this route is "/brands/:id/contact"
// by default it doesn't have access to the brand:id params
const router = express.Router({ mergeParams: true });

// self-defined utility helper functions
const catchAsync = require("../utils/catchAsync");

// our own middleware to verify logged in
const { isLoggedIn } = require("../middleware/isLoggedIn");

// for handling image -- leadership profile picture
const multer = require("multer");
const { leadershipProfile } = require("../cloudinary"); // Node will automatically look for index.js
const upload = multer({ storage: leadershipProfile });

// leadership controller
const leaderships = require("../controllers/leaderships");

// validation with Joi schema
const { validateLeadership } = require("../middleware/validateData");

router.post(
  "/",
  isLoggedIn,
  upload.single("profilePicture"),
  validateLeadership,
  catchAsync(leaderships.add)
);

router
  .delete(
    "/:leadershipId",
    isLoggedIn,
    catchAsync(leaderships.deleteLeadership)
  )
  .put("/:leadershipId", isLoggedIn, upload.single("profilePicture"), catchAsync(leaderships.edit));

module.exports = router;
