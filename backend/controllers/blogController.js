const asyncHandler = require("express-async-handler");

const Blog = require("../models/Blog"); //impoting the Blog Model
const User = require("../models/User"); //impoting the User Model
const Student = require("../models/Student"); //improting the student Model

//Returns all the blogs from the database
const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    let blog = await Blog.find({}).populate("userid", "_id name"); //getting all the blogs from the database

    res.json({ blog }); //All blogs are returned as the response
  } catch (e) {
    res.status(500).json({ msg: "Server Error" });
  }
});
const getAllAdminBlogs = asyncHandler(async (req, res) => {
  try {
    let blogs = await Blog.find({ postedBy: 1 }); //getting all the blogs from the database

    res.json({ blogs }); //All blogs are returned as the response
  } catch (e) {
    res.status(500).json({ msg: "Server Error" });
  }
});
//Returns a particular blog based on the blog id
const getBlogById = asyncHandler(async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id); //getting the blog from the database
    if (!blog)
      return res
        .status(500)
        .json({ msg: "No such Blog exists in the database" });

    res.json(blog); //Blog is returned as the response
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

//Returns all the blogs of a particular user
const getBlogByUserId = asyncHandler(async (req, res) => {
  try {
    let blogs = await Blog.find({ userid: req.params.userid }).populate(
      "userid",
      "_id name"
    ); //getting all the blogs of the user
    if (!blogs)
      return res.status(500).json({ msg: "No Blogs in the database" });

    res.json({ blogs }); //Blogs are returned as the response
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});
//Adds a blog to the database
const addBlog = asyncHandler(async (req, res) => {
  const { title, description, content, tags, image, postedBy } = req.body; //extracting the blog details from the request
  try {
    let newBlog = new Blog({
      userid: "",
      title,
      description,
      content,
      tags: tags.split(","),
      image,
      postedBy,
    });
    if (postedBy === 1) {
      newBlog.userid = await User.findOne({ type: 1 })._id;
    } else {
      newBlog.userid = req.student.id;
    }
    const blog = await newBlog.save(); //new blog is saved
    res.json(blog); //newly created blog is returned as the response
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});
//Updating a blog
const updateBlog = asyncHandler(async (req, res) => {
  let blog = await Blog.findById(req.params.id); //getting the blog which is to be updated
  if (
    (blog.postedBy === 1 && String(blog.userid) === req.user.id) ||
    String(blog.userid) === req.student.id
  ) {
    //checking if the blog belongs to the  logged in user or not
    const { title, description, content, tags, image, comments } = req.body; //extrating blog details from the request

    try {
      const updatedBlog = {};
      let blog = await Blog.findById(req.params.id);
      if (!blog)
        return res.status(500).json({ msg: "No such blog exists in database" });

      if (title) updatedBlog.title = title;
      if (description) updatedBlog.description = description;
      if (content) updatedBlog.content = content;
      if (image) updatedBlog.image = image;
      if (tags) updatedBlog.tags = tags.split(",");
      if (comments) updatedBlog.comments = comments;

      blog = await Blog.findByIdAndUpdate(req.params.id, {
        $set: updatedBlog,
        new: true,
      }); //updating the blog
      res.json(updatedBlog); //returning the updated blog as the response
    } catch (e) {
      res.status(500).json({ msg: e.message });
    }
  } else {
    res.status(500).json({ msg: "You can't Modify someone else's Blog" });
  }
});

//Deletes the blog from the database
const deleteBlog = asyncHandler(async (req, res) => {
  let blog = await Blog.findById(req.params.id); //getting blog from the database using the blog id
  if (
    (blog.postedBy === 1 && String(blog.userid) === req.user.id) ||
    String(blog.userid) === req.student.id
  ) {
    //checking if the blog belongs to the logged in user or not
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) return res.status(500).json({ msg: "Blog not found" });
      await Blog.findByIdAndRemove(req.params.id); //deleting the blog
      res.json({ msg: "blog Removed" });
    } catch (error) {
      res.status(500).json({ msg: "Server Error" });
    }
  } else {
    res.status(500).json({ msg: "You can't Delete an blog" });
  }
});
module.exports = {
  getAllBlogs: getAllBlogs,
  getBlogById: getBlogById,
  updateBlog: updateBlog,
  deleteBlog: deleteBlog,
  addBlog: addBlog,
  getBlogByUserId: getBlogByUserId,
  getAllAdminBlogs: getAllAdminBlogs,
};
