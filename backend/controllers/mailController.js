const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

const sendAnnouncementNotification = asyncHandler(async (req, res) => {
  try {
    const { students, announcement } = req.body;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "prem47645@gmail.com",
        pass: "premkumar@1803",
      },
    });
    students.forEach((student) => {
      transporter.sendMail({
        from: "Admin@Tnp NIT Delhi <prem47645@gmail.com>",
        to: student,
        subject: "New Announcement :" + announcement.title,
        text: announcement.content,
        html: announcement.content,
      });
    });

    res.status(400).json({
      msg: "Mail Sent",
    });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});
const sendOTP = asyncHandler(async (req, res) => {
  try {
    const { student, otp } = req.body;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "prem47645@gmail.com",
        pass: "premkumar@1803",
      },
    });
    if (student) {
      transporter.sendMail({
        from: "Admin@Tnp NIT Delhi <prem47645@gmail.com>",
        to: student,
        subject: "Verify your Email",
        text:
          "Hi,Thank you for Registering on the TNP POrtal of NIT Delhi Verfiy Your Registation Below is your one time passcode " +
          otp +
          " This one time passcode will be valid for 5 min",
        html:
          "<h4>Hi,</h4><h4>Thank you for Registering on the TNP Portal of NIT Delhi</h4><h1>Verify Your Registration</h1><h4>Below is your one time passcode :</h4><h3>" +
          otp +
          "</h3> <h4>This one time passcode will be valid for 5 min</h4>",
      });

      res.json({
        msg: "Mail Sent",
      });
    }
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});
const sendOTPToResetPassword = asyncHandler(async (req, res) => {
  try {
    const { student, otp } = req.body;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "prem47645@gmail.com",
        pass: "premkumar@1803",
      },
    });
    if (student) {
      transporter.sendMail({
        from: "Admin@Tnp NIT Delhi <prem47645@gmail.com>",
        to: student,
        subject: "Reset Your Password",
        text:
          "Hi,Below is your one time passcode to reset your password " +
          otp +
          " This one time passcode will be valid for 5 min",
        html:
          "<h4>Hi,</h4><h4>Below is your one time passcode to reset your password</h4><h3>" +
          otp +
          "</h3> <h4>This one time passcode will be valid for 5 min</h4>",
      });

      res.json({
        msg: "Mail Sent",
      });
    }
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});
module.exports = {
  sendAnnouncementNotification: sendAnnouncementNotification,
  sendOTP: sendOTP,
  sendOTPToResetPassword: sendOTPToResetPassword,
};
