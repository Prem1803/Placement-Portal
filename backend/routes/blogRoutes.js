const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getBlogById,
  addBlog,
  updateBlog,
  deleteBlog,
  getBlogByUserId,
  getAllAdminBlogs,
} = require("../controllers/blogController.js"); //importing the functions from the blog controller
const auth = require("../middleware/authMiddleware.js"); //importing the middleware for protecting the routes

router.route("/").post(auth, addBlog).get(getAllBlogs); //post routes is a private route for adding the blog
router.route("/adminblog").get(getAllAdminBlogs);
router.route("/:id").get(getBlogById); //route for getting the blog
router.route("/userBlogs/:userid").get(getBlogByUserId); //route for getting the blogs of the user
router.route("/:id/").put(auth, updateBlog); //route for updating the blog
router.route("/:id/").delete(auth, deleteBlog); //route for deleting the blog

module.exports = router;
