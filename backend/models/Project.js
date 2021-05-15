//Project Model

const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  studentid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "students",
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  stacks: {
    type: Array,
    required: true,
    default: [],
  },
  status: {
    type: String,
    required: true,
  },
  repoUrl: {
    type: String,
    required: true,
  },
  demoUrl: {
    type: String,
    required: false,
  },
  dateCreated: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("project", ProjectSchema);
