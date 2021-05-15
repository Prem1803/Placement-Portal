//Comment Model

const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  blogid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blogs",
  },
  content: {
    type: String,
    required: true,
  },

  dateCreated: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("comment", CommentSchema);
