const express = require("express");
const {
  sendAnnouncementNotification,
  sendOTP,
  sendOTPToResetPassword,
  contactFormSubmission,
} = require("../controllers/mailController");
const router = express.Router();

router
  .route("/sendannouncementnotification")
  .post(sendAnnouncementNotification);
router.route("/sendotp").post(sendOTP);
router.route("/contact").post(contactFormSubmission);
router.route("/sendotptoresetpassword").post(sendOTPToResetPassword);
module.exports = router;
