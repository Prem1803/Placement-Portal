const express = require("express");
const {
  sendAnnouncementNotification,
  sendOTP,
} = require("../controllers/mailController");
const router = express.Router();

router.route("/").post(sendAnnouncementNotification);
router.route("/sendotp").post(sendOTP);
module.exports = router;
