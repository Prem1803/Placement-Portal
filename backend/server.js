const path = require("path");
const express = require("express");
const app = express();
const connectDB = require("../config/db");
app.use(express.json({ extended: false }));

//importing routes
const userRoutes = require("./routes/userRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const blogRoutes = require("./routes/blogRoutes");
const projectRoutes = require("./routes/projectRoutes");
const uploadRoutes = require("./routes/uploadRoutes.js");
const cors = require("cors");

//Connecting to the database
connectDB();
app.use(cors());

//Backend Routes
app.use("/api/users", userRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/upload", uploadRoutes);

const _dirname = path.resolve();
app.use("/uploads", express.static(path.join(_dirname, "/uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  //listening to the port
  console.log(`Server started on PORT ${PORT}`);
});
