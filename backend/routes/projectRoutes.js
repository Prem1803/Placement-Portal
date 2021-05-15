const express = require("express");
const router = express.Router();
const {
  getAllProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
  getProjectByStudentId,
} = require("../controllers/projectController.js"); //importing the functions from the project controller
const auth = require("../middleware/authMiddleware.js"); //importing the middleware for protecting the routes

router.route("/").post(auth, addProject).get(getAllProjects); //post routes is a private route for adding the project
router.route("/:id").get(getProjectById); //route for getting the project
router.route("/studentProjects/:studentid").get(getProjectByStudentId); //route for getting the projects of the user
router.route("/:id/").put(auth, updateProject); //route for updating the project
router.route("/:id/").delete(auth, deleteProject); //route for deleting the project

module.exports = router;
