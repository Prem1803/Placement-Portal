//Student Model

const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  rollNo: {
    type: Number,
    required: true,
  },
  branch: {
    type: String,
    required: true,
    default: "CSE",
  },
  course: {
    type: String,
    required: true,
  },
  passoutYear: {
    type: String,
    required: true,
  },
  cgpa: { type: Number, required: false, default: "" },
  dob: {
    type: String,
    required: false,
    default: "",
  },
  gender: {
    type: String,
    required: false,
    default: "Male",
  },
  mobileNo: {
    type: String,
    required: false,
    default: "",
  },
  nationality: {
    type: String,
    required: false,
    default: "",
  },
  address: {
    type: String,
    required: false,
    default: "",
  },
  board10th: {
    type: String,
    required: false,
    default: "",
  },
  passingYear10th: {
    type: String,
    required: false,
    default: "",
  },
  percentage10th: {
    type: String,
    required: false,
    default: "",
  },
  board12th: {
    type: String,
    required: false,
    default: "",
  },
  passingYear12th: {
    type: String,
    required: false,
    default: "",
  },
  percentage12th: {
    type: String,
    required: false,
    default: "",
  },
  imgUrl: {
    type: String,
    required: false,
    default:
      "https://res.cloudinary.com/dhfw6jmp9/image/upload/v1657878026/images_qcxcsn.jpg",
  },
  linkedInUrl: {
    type: String,
    required: false,
    default: "",
  },
  resumeUrl: {
    type: String,
    required: false,
    default: "",
  },
  interests: {
    type: String,
    required: false,
    default: "",
  },
  contactEmail: {
    type: String,
    required: false,
    default: "",
  },
  placementStatus: {
    type: String,
    required: false,
    default: "Not Placed",
  },
  dateCreated: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("student", StudentSchema);
