const Announcement = require("../models/Announcement"); //Importing Announcement Model
const User = require("../models/User"); //Importing User Model
const asyncHandler = require("express-async-handler");

//returns all the announcements from the database
const getAllAnnouncements = asyncHandler(async (req, res) => {
  try {
    let announcement = await Announcement.find({}); //getting all the announcements from the database
    res.json({ announcement }); //all the announcements are returned as the response
  } catch (e) {
    res.status(500).json({ msg: "Server Error" }); //if some thing went wrong then error is throwed
  }
});

//returns a particular announcement from the database on the basis of announcement id
const getAnnouncementById = asyncHandler(async (req, res) => {
  try {
    let announcement = await Announcement.findById(req.params.id); //getting the announcement from the database
    if (!announcement)
      return res
        .status(400)
        .json({ msg: "No such announcement exists in the database" }); //if there are no announcements in the database

    res.json(announcement); //particular announcement is returned as the response
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

//adds an announcement to the database
const addAnnouncement = asyncHandler(async (req, res) => {
  let user = await User.findById(req.user.id); //getting user from the database on the basis of id
  if (user.type === 1) {
    //checking if user has the right to add an announcement
    const { title, description, content, tags, image } = req.body; //extracting the announcement details from the request
    try {
      const newAnnouncement = new Announcement({
        title,
        description,
        content,
        tags: tags.split(","),
        image,
      }); //creating an announcement
      const announcement = await newAnnouncement.save(); //saving the announcement
      res.json(announcement); //newly created announcement is returned as the response
    } catch (e) {
      console.log(e.message);
    }
  } else {
    res.json({ error: "You can't post an announcement" }); //If user is not an admin then he can't add an announcement
  }
});

//updates an existing announcement
const updateAnnouncement = asyncHandler(async (req, res) => {
  let user = await User.findById(req.user.id); //getting user from the database on the basis of id
  if (user.type === 1) {
    //checking if user has the right to add an announcement
    const { title, description, content, tags, image } = req.body; //extracting the announcement details from the request

    try {
      const updatedAnnouncement = {};
      let announcement = await Announcement.findById(req.params.id); //checking if the announcement exists in the database or not
      if (!announcement)
        return res
          .status(400)
          .json({ msg: "No such announcemt exists in database" });

      if (title) updatedAnnouncement.title = title;
      if (description) updatedAnnouncement.description = description;
      if (content) updatedAnnouncement.content = content;
      if (image) updatedAnnouncement.image = image;
      if (tags) updatedAnnouncement.tags = tags.split(",");

      announcement = await Announcement.findByIdAndUpdate(req.params.id, {
        $set: updatedAnnouncement,
        new: true,
      }); //updating the announcement
      res.json(updatedAnnouncement); // updated announcement is returned as the response
    } catch (e) {
      res.status(500).json({ msg: e.message });
    }
  } else {
    res.json({ error: "You can't Modify an announcement" }); //If user is not an admin then he can't update an announcement
  }
});

//deletes an existing announcement
const deleteAnnouncement = asyncHandler(async (req, res) => {
  let user = await User.findById(req.user.id); //getting user from the database on the basis of id
  if (user.type === 1) {
    //checking if user has the right to add an announcement
    try {
      const announcement = await Announcement.findById(req.params.id); //checking if the announcement exists in the database or not
      if (!announcement)
        return res.status(400).json({ msg: "Announcement not found" });

      await Announcement.findByIdAndRemove(req.params.id); //deleting the announcement
      res.json({ msg: "announcement Removed" });
    } catch (error) {
      res.status(500).json({ msg: "Server Error" });
    }
  } else {
    res.json({ error: "You can't Delete an announcement" }); //If user is not an admin then he can't update an announcement
  }
});
module.exports = {
  addAnnouncement: addAnnouncement,
  deleteAnnouncement: deleteAnnouncement,
  updateAnnouncement: updateAnnouncement,
  getAllAnnouncements: getAllAnnouncements,
  getAnnouncementById: getAnnouncementById,
};
