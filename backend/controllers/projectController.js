const asyncHandler = require("express-async-handler");

const Project = require("../models/Project"); //importing the Project Model
const Student = require("../models/Student"); //importing the Student Model
const User = require("../models/User"); //importing the User Model
//Return all the Projects from the database
const getAllProjects = asyncHandler(async (req, res) => {
  try {
    let projects = await Project.find({}); //getting all the projects

    res.json({ projects }); //returning the projects as the response
  } catch (e) {
    res.status(500).json({ msg: "Server Error" });
  }
});

//returns a particular project based on the id
const getProjectById = asyncHandler(async (req, res) => {
  try {
    let project = await Project.findById(req.params.id); //getting the project from the database
    if (!project)
      return res
        .status(400)
        .json({ msg: "No such project exists in the database" });

    res.json(project); //project is returned as the response
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

//Returns all the projects of a particular student
const getProjectByStudentId = asyncHandler(async (req, res) => {
  try {
    let project = await Project.find({ studentid: req.params.studentid }); //getting all the projects of the student
    if (!project)
      return res.status(400).json({ msg: "No projects in the database" });
    let projects = [];
    project.forEach((project) => {
      let student = Student.findById(project.studentid);
      project.studentName = student.name; //adding studentName to the project
      projects.push(project);
    });
    res.json({ projects }); //student's project are returned as the response
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

//Adds a new Project to the database
const addProject = asyncHandler(async (req, res) => {
  let user = await User.findById(req.user.id); //getting the user
  if (user.type === 0) {
    //checking if the user is a student or not
    const {
      name,
      stacks,
      status,
      image,
      description,
      demoUrl,
      repoUrl,
    } = req.body; //extracting the project details from the request
    try {
      const newProject = new Project({
        studentid: req.student.id,
        name,
        stacks: stacks.split(","),
        status,
        image,
        description,
        demoUrl,
        repoUrl,
      }); //creating a new project
      const project = await newProject.save(); //saving the new project
      res.json(project); //newly created project is returned as the response
    } catch (e) {
      console.log(e.message);
    }
  } else {
    res.json({ error: "You can't post an project" });
  }
});

//updating a particular project
const updateProject = asyncHandler(async (req, res) => {
  let user = await User.findById(req.user.id); //getting the user
  if (user.type === 0) {
    const {
      name,
      stacks,
      description,
      status,
      image,
      repoUrl,
      demoUrl,
    } = req.body; //extracting the project details from the request

    try {
      const updatedProject = {};
      let project = await Project.findById(req.params.id); //getting the project
      if (!project)
        return res
          .status(400)
          .json({ msg: "No such announcemt exists in database" });
      if (String(project.studentid) !== req.student.id)
        return res.json("You are not allowed to edit someone else's project");
      if (name) updatedProject.name = name;
      if (description) updatedProject.description = description;
      if (stacks) updatedProject.stacks = stacks.split(",");
      if (image) updatedProject.image = image;
      if (status) updatedProject.status = status;
      if (repoUrl) updatedProject.repoUrl = repoUrl;
      if (demoUrl) updatedProject.demoUrl = demoUrl;

      project = await Project.findByIdAndUpdate(req.params.id, {
        $set: updatedProject,
        new: true,
      }); //updating the project
      res.json(updatedProject); //updated project is returned as the response
    } catch (e) {
      res.status(500).json({ msg: e.message });
    }
  } else {
    res.json({ error: "You can't Modify a project" });
  }
});

//delete's a particular project from the database
const deleteProject = asyncHandler(async (req, res) => {
  try {
    const project = await Project.findById(req.params.id); //getting the project
    if (!project) return res.status(400).json({ msg: "Project not found" });
    if (String(project.studentid) !== req.student.id)
      //checking if the project belongs to the user or not
      return res.json("You are not allowed to delete someone else's project");

    await Project.findByIdAndRemove(req.params.id, (err) => {
      //deleting the project
      if (err) console.log(err);
    });
    res.json({ msg: "project Removed" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});
module.exports = {
  getAllProjects: getAllProjects,
  getProjectById: getProjectById,
  addProject: addProject,
  updateProject: updateProject,
  deleteProject: deleteProject,
  getProjectByStudentId: getProjectByStudentId,
};
