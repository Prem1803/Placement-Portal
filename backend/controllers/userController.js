const bcrypt = require("bcryptjs");
const User = require("../models/User"); //importing User model
const Student = require("../models/Student"); //importing Student model
const config = require("config");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

//Registering the Admin and generating a token
const registerAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body; //extracting email and password from the request
  try {
    let user = await User.findOne({ email }); //checking if user with same email is already present or not
    if (user) {
      return res.status(400).json({ message: "User already exits" });
    }
    user = await new User({
      email,
      password,
      type: 1,
    }); //creating new user
    await bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        //hashing the password so that the password is secured
        if (!err) {
          user.password = hash;
          user.save(); //user with hashed password is saved to the database
        }
      });
    });
    const payload = {
      //payload for generating the token
      user: { id: user._id },
    };
    jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
      //token is generated using jwt
      if (err) throw err;
      res.json({ token: token }); //token is returned as the response
    });
  } catch (err) {
    console.error(err.message);
  }
});

//Registering the student and generating token
const registerStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body; //extracting email and password from the request
  try {
    let user = await User.findOne({ email }); //checking if user with same email is already present or not
    if (user) {
      return res
        .status(400)
        .json({ isRegistered: false, message: "User already exits" });
    }
    user = await new User({
      email,
      password,
      type: 0,
    }); //creating new user
    await bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        //hashing the password so that the password is secured
        if (!err) {
          user.password = hash;
          user.save(); //user with hashed password is saved to the database
        }
      });
    });
    const { name, rollNo, branch, batch, year } = req.body; //extracting student details from the request
    try {
      const newStudent = new Student({
        userid: user._id,
        name,
        rollNo,
        branch,
        batch,
        year,
      }); //creating new student
      await newStudent.save();

      const payload = {
        //payload for generating the token
        user: { id: user._id },
        student: { id: newStudent._id },
      };
      jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
        //token is generated using jwt
        if (err) throw err;
        res.json({ isRegistered: true, token: token }); //token is returned as the response
      });
    } catch (e) {
      await User.findOneAndRemove({ email: user.email }); //if something went wrong the user created is deleted

      res.json({
        isRegistered: false,
        msg: "Unable to register the New User at this time",
      });
    }
  } catch (err) {
    console.error(err.message);
  }
});

//Authenticating user(Student) and generating token
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; //extracting email and password from the request
  try {
    const user = await User.findOne({ email }); //getting the user based on email
    if (!user) {
      return res.status(400).json({ msg: "Invalid Email" }); //if no such user exists in the database
    }
    if (user.type === 1)
      return res.json({ isLoggedIn: false, msg: "Error Occurred" });
    const student = await Student.findOne({ userid: user._id }); //getting the student from the database

    await bcrypt.compare(password, user.password, function (err, result) {
      //comparing the hashed password with the given password
      if (err) return res.status(400).json({ isLoggedIn: false });
      if (!result) {
        return res
          .status(400)
          .json({ isLoggedIn: false, msg: "Invalid Password" }); //if hashed password after dehashing is not same as the given password
      } else {
        //if password matches
        let payload = {
          //payload for generating jwt token
          user: { id: user._id },
          student: { id: student._id },
        };

        jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
          //generating jwt token
          if (err) {
            return res
              .status(400)
              .json({ isLoggedIn: false, msg: "Error Occurred" });
          }
          if (user.type === 0)
            return res.json({ isLoggedIn: true, token: token });
          //returning jwt token as the response
          else return res.json({ isLoggedIn: false, msg: "Error Occurred" });
        });
      }
    });
  } catch (err) {
    console.error(err.message);
  }
});

//Authenticating admin and generating token
const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body; //extracting email and password from the request
  try {
    const user = await User.findOne({ email }); //getting the user based on email
    if (!user) {
      return res.status(400).json({ msg: "Invalid Email" }); //if no such user exists in the database
    }

    await bcrypt.compare(password, user.password, function (err, result) {
      //comparing the hashed password with the given password
      if (err) return res.status(400).json({ isLoggedIn: false });
      if (!result) {
        return res
          .status(400)
          .json({ isLoggedIn: false, msg: "Invalid Password" }); //if hashed password after dehashing is not same as the given password
      } else {
        //if password matches
        let payload = {
          //payload for generating jwt token
          user: { id: user._id },
        };

        jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
          //generating jwt token
          if (err) {
            return res
              .status(400)
              .json({ isLoggedIn: false, msg: "Error Occurred" });
          }
          if (user.type === 1)
            return res.json({ isLoggedIn: true, token: token });
          //returning jwt token as the response
          else return res.json({ isLoggedIn: false, msg: "Error Occurred" });
        });
      }
    });
  } catch (err) {
    console.error(err.message);
  }
});

//Returns the user details of the logged in user
const getLoggedInUser = asyncHandler(async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password"); //getting the user from the database

    if (user.type === 1) {
      //if user is an admin
      let userDetails = {
        type: user.type,
        uid: user._id,
      };
      res.json(userDetails); //user details are returned as response
    } else {
      //if user is a student
      try {
        let student = await Student.findById(req.student.id); //getting the student from the database
        let userDetails = {
          type: user.type,
          uid: user._id,
          sid: student._id,
        };
        res.json(userDetails); //user details are returned as response
      } catch (e) {
        console.log(e.message);
        res.status(500).json({ msg: "Server Error" });
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Returns a particular student based on the id
const getUserById = asyncHandler(async (req, res) => {
  try {
    const student = await Student.findById(req.params.id); //getting the student on the basis of the id
    if (student) res.json(student);
    //returning the student as the response
    else res.json({ msg: "No such student exists in the database" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Updates a particular student
const updateUserById = asyncHandler(async (req, res) => {
  try {
    let student = await Student.findById(req.student.id); //getting the student from the database
    if (student) {
      //if student exists
      let updatedstudent = req.body; //extracting the student details from the request
      let skills = updatedstudent.skills;
      if (skills.indexOf(",") !== -1) updatedstudent.skills = skills.split(",");
      student = await Student.updateOne(
        { _id: req.student.id },
        { $set: updatedstudent }
      ); //updating the student
      res.json(updatedstudent); //returning the updated student as the response
    } else res.json({ msg: "No such student exists in the database" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Returns all the students which are currently studing in the college
const getAllStudents = asyncHandler(async (req, res) => {
  try {
    const users = await Student.find({}); //getting all the students from the database
    let students = [];
    users.forEach((user) => {
      let d1 = new Date().getFullYear();
      let d2 = Number(user.year);

      if (new Date().getFullYear() - Number(user.year) <= 4) {
        //checking if the user is the current student or not
        students.push(user);
      }
    });
    res.json({ students }); //all the current 1st to 4th year students are returned as the response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Returns all the alumnis
const getAllAlumni = asyncHandler(async (req, res) => {
  try {
    const users = await Student.find({}); //getting all the students from the database
    let alumni = [];
    users.forEach((user) => {
      let d1 = new Date().getFullYear();
      let d2 = Number(user.year);

      if (new Date().getFullYear() - Number(user.year) > 4) {
        //checking if the student is an alumni or not
        alumni.push(user);
      }
    });
    res.json({ alumni }); //returns all the alumnis as the response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = {
  registerAdmin: registerAdmin,
  registerStudent: registerStudent,
  getLoggedInUser: getLoggedInUser,
  authUser: authUser,
  authAdmin: authAdmin,
  getUserById: getUserById,
  updateUserById: updateUserById,
  getAllStudents: getAllStudents,
  getAllAlumni: getAllAlumni,
};
