const express = require("express");
const router = express.Router();
const {
  authUser,
  registerAdmin,
  registerStudent,
  getLoggedInUser,
  authAdmin,
  getUserById,
  updateUserById,
  getAllStudents,
  getAllAlumni,
  isEmailAvailable,
  resetPassword,
  getAllBTechStudents,
  getAllMTechStudents,
  getAllPhDStudents,
  getAllUsers,
  updateUser,
  getUserInfo,
} = require("../controllers/userController.js"); //importing the functions from the user controller
const auth = require("../middleware/authMiddleware.js"); //importing the middleware for protecting the routes
router.put("/resetPassword", resetPassword); //route for updating password

router.get("/allStudents", getAllStudents); //route for getting all the students
router.get("/allusers", getAllUsers); //route for getting all the students
router.put("/updateUser", auth, updateUser);
router.get("/allBtechStudents", getAllBTechStudents); //route for getting all the students
router.get("/allMtechStudents", getAllMTechStudents); //route for getting all the students
router.get("/allPhDStudents", getAllPhDStudents); //route for getting all the students
router.get("/allAlumni", getAllAlumni); //route for getting all the alumni's
router.post("/isEmailAvailable", isEmailAvailable);
router.post("/admin", registerAdmin); //route for registering the admin
router.post("/login", authUser); //route for authenticating the Student
router.post("/adminlogin", authAdmin); //route for authenticating the admin
router.get("/getLoggedInUser", auth, getLoggedInUser); //route for getting the logged in user
router.post("/student", registerStudent); //route for registering the student
router.get("/:id", getUserById); //route for getting a particular student
router.get("/userInfo/:id", getUserInfo); //route for getting a particular student
router.put("/:id", auth, updateUserById); //route for updating a particular student

module.exports = router;
