//User Model
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
    default: 0, //1 for admin 0 for students/alumins ,
  },
  dateCreated: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("user", UserSchema);
