const express = require("express");
const router = express.Router();
const {
  getAllAnnouncements,
  getAnnouncementById,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcementController.js"); //importing the functions from the announcemnet controller
const auth = require("../middleware/authMiddleware.js"); //importing the middleware for protecting the routes

router.route("/").post(auth, addAnnouncement).get(getAllAnnouncements); //post routes is a private route for adding the announcement
router.route("/:id").get(getAnnouncementById); //route for getting the announcement
router.route("/:id/").put(auth, updateAnnouncement); //route for updating the announcement
router.route("/:id/").delete(auth, deleteAnnouncement); //route for deleting the announcement

module.exports = router;
