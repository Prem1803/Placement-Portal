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
    default: 0, //1 for admin 0 for students/alumins 2 for students with partial admin access 3 for students with complete admin access,
  },
  dateCreated: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("user", UserSchema);
