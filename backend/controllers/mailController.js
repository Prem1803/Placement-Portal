const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const { getMaxListeners } = require("../models/User");
const User = require("../models/User"); //importing User model

const sendAnnouncementNotification = asyncHandler(async (req, res) => {
  try {
    const { announcement } = req.body;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    let students = await User.find({ type: 0 });
    students.forEach((student) => {
      transporter.sendMail({
        from: "Admin@Tnp NIT Delhi <prem.test.email@gmail.com>",
        to: student.email,
        subject: "New Announcement ",
        text:
          "Hi , An Announcement has been added to the TNP Portal by the Admin .Below is the link to view the announcement http://localhost:3000/announcements/" +
          announcement._id,
        html:
          "<h4>Hi,</h4> <h3>An Announcement has been added to the TNP Portal by the Admin.</h3><h3> Below is the link to view the announcement </h3> <h3>http://localhost:3000/announcements/" +
          announcement._id +
          "</h3><h4>Thank You</h4>",
      });
    });
    students = await User.find({ type: 2 });
    students.forEach((student) => {
      transporter.sendMail({
        from: "Admin@Tnp NIT Delhi <prem.test.email@gmail.com>",
        to: student.email,
        subject: "New Announcement ",
        text:
          "Hi , An Announcement has been added to the TNP Portal by the Admin .Below is the link to view the announcement http://localhost:3000/announcements/" +
          announcement._id,
        html:
          "<h4>Hi,</h4> <h3>An Announcement has been added to the TNP Portal by the Admin.</h3><h3> Below is the link to view the announcement </h3> <h3>http://localhost:3000/announcements/" +
          announcement._id +
          "</h3><h4>Thank You</h4>",
      });
    });

    res.json({
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
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    if (student) {
      transporter.sendMail({
        from: "Admin@Tnp NIT Delhi <prem.test.email@gmail.com>",
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
const contactFormSubmission = asyncHandler(async (req, res) => {
  try {
    const { name, email, subject, category, content } = req.body;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    if (category === "General Query")
      transporter.sendMail({
        from: name + " <prem.test.email@gmail.com>",
        to: process.env.EMAIL,
        subject: "Contact Form Submission: " + category,
        text:
          "Name:" +
          name +
          "Email:" +
          email +
          "Subject:" +
          subject +
          "Message:" +
          content,
        html:
          "<h3>Name:" +
          name +
          "</h3><h3>Email:</h3>" +
          email +
          "<h3>Subject:" +
          subject +
          "</h3><h3>Message:" +
          content +
          "</h3>",
      });
    else
      transporter.sendMail({
        from: name + " <prem.test.email@gmail.com>",
        to: process.env.EMAIL,
        subject: "Contact Form Submission: " + category,
        text:
          "Name:" +
          name +
          "Email:" +
          email +
          "Subject:" +
          subject +
          "Message:" +
          content,
        html:
          "<h3>Name:" +
          name +
          "</h3><h3>Email:</h3>" +
          email +
          "<h3>Subject:" +
          subject +
          "</h3><h3>Message:" +
          content +
          "</h3>",
      });
    res.json({
      msg: "Mail Sent",
    });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});
const sendOTPToResetPassword = asyncHandler(async (req, res) => {
  try {
    const { student, otp } = req.body;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    if (student) {
      transporter.sendMail({
        from: "Admin@Tnp NIT Delhi <prem.test.email@gmail.com>",
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
  contactFormSubmission: contactFormSubmission,
};
