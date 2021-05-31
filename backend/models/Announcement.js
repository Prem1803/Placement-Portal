//Announcement Model

const mongoose = require("mongoose");

const AnnouncementSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
    default: [],
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  dateCreated: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("announcement", AnnouncementSchema);
