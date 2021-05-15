const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

//Connecting to mongodb atlas
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }); //Connecting to the backend
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message); //If something went wrong while connecting then error is throwed
    process.exit(1);
  }
};

module.exports = connectDB;
