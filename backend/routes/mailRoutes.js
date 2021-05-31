const express = require("express");
const {
  sendAnnouncementNotification,
  sendOTP,
  sendOTPToResetPassword,
} = require("../controllers/mailController");
const router = express.Router();

router.route("/").post(sendAnnouncementNotification);
router.route("/sendotp").post(sendOTP);
router.route("/sendotptoresetpassword").post(sendOTPToResetPassword);
module.exports = router;
