//Student Model

const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
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
  batch: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: false,
    default: "",
  },
  bio: {
    type: String,
    required: false,
    default: "",
  },
  worksAt: {
    type: String,
    required: false,
    default: "",
  },
  skills: {
    type: Array,
    default: [],
  },
  imgUrl: {
    type: String,
    required: false,
    default: "image-1617535773762.jpg",
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
  githubUrl: {
    type: String,
    required: false,
    default: "",
  },
  contactEmail: {
    type: String,
    required: false,
    default: "",
  },
  portfolioWebsite: {
    type: String,
    required: false,
    default: "",
  },
  dateCreated: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("student", StudentSchema);
