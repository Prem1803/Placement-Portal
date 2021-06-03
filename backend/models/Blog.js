//Blog Model
const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
  title: {
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
  postedBy: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Array,
    default: [],
  },

  dateCreated: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("blog", BlogSchema);
