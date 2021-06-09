const bcrypt = require("bcryptjs");
const User = require("../models/User"); //importing User model
const Student = require("../models/Student"); //importing Student model
const config = require("config");
const jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
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
      user: { id: user._id, email: user.email, type: user.type },
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
const isEmailAvailable = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email }); //checking if user with same email is already present or not
    if (user) {
      return res.json({ isEmailAvailable: false });
    } else {
      return res.json({ isEmailAvailable: true });
    }
  } catch (e) {
    console.error(e.message);
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
    const { name, rollNo, branch, course, passoutYear } = req.body; //extracting student details from the request
    try {
      const newStudent = new Student({
        userid: user._id,
        name,
        rollNo,
        branch,
        course,
        passoutYear,
        contactEmail: email,
      }); //creating new student
      await newStudent.save();

      const payload = {
        //payload for generating the token
        user: { id: user._id, email: user.email, type: user.type },
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
          user: { id: user._id, email: user.email, type: user.type },
          student: { id: student._id },
        };

        jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
          //generating jwt token
          if (err) {
            return res
              .status(400)
              .json({ isLoggedIn: false, msg: "Error Occurred" });
          }
          if (user.type === 0 || user.type === 2 || user.type === 3)
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
          user: { id: user._id, email: user.email, type: user.type },
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
        email: user.email,
      };
      res.json(userDetails); //user details are returned as response
    } else {
      //if user is a student
      try {
        let student = await Student.findById(req.student.id); //getting the student from the database
        let userDetails = {
          type: user.type,
          uid: user._id,
          email: user.email,
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
    const student = await Student.findById(req.params.id).select(
      " -cgpa -dob -gender -mobileNo -nationality -address  -board10th -passingYear10th -percentage10th -board12th -passingYear12th -percentage12th  -resumeUrl  -dateCreated "
    ); //getting the student on the basis of the id
    if (student) res.json(student);
    //returning the student as the response
    else res.json({ msg: "No such student exists in the database" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const getUserInfo = asyncHandler(async (req, res) => {
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
const updateStudent = asyncHandler(async (req, res) => {
  try {
    const student = await Student.updateOne(
      { _id: req.body.id },
      { $set: { placementStatus: req.body.placementStatus } }
    ); //updating the student
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const updateUser = asyncHandler(async (req, res) => {
  try {
    if (req.user.type === 1) {
      const user = await User.updateOne(
        { _id: req.body._id },
        { $set: { type: req.body.type } }
      ); //updating the user
      res.json({ msg: "User Updated" }); //returning the updated user as the response
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const resetPassword = asyncHandler(async (req, res) => {
  try {
    let password = "";
    // await bcrypt.genSalt(10, function (err, salt) {
    //   bcrypt.hash(req.body.password, salt, function (err, hash) {
    //     //hashing the password so that the password is secured
    //     password = hash;
    //   });
    // });
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.updateOne(
      { email: req.body.email },
      { $set: { password: hashedPassword } }
    ); //getting the User from the database
    res.json({ passwordReset: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await Student.find({})
      .select(
        "-branch -cgpa -dob -gender -mobileNo -nationality -address -board10th -passingYear10th -percentage10th -board12th -passingYear12th -percentage12th -imgUrl -linkedInUrl -resumeUrl -contacEmail -dateCreated  -course -passoutYear"
      )
      .populate("userid", "_id email type")
      .then((result) => {
        return res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });

    // students.sort((a, b) => a.passoutYear - b.passoutYear);
    //res.json(users); //all the current 1st to 4th year students are returned as the response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  // try {
  //   const users = await Student.find({}).select(
  //     "-branch -cgpa -dob -gender -mobileNo -nationality -address -board10th -passingYear10th -percentage10th -board12th -passingYear12th -percentage12th -imgUrl -linkedInUrl -resumeUrl -contactEmail -dateCreated  -course -passoutYear"
  //   );
  //   for (var i = 0; i < users.length; i++) {
  //     const userDetails = await User.findOne({ _id: users[i].userid });
  //     users[i] = {
  //       userInfo: users[i],
  //       email: userDetails.email,
  //       type: userDetails.type,
  //     };
  //   }
  //   // students.sort((a, b) => a.passoutYear - b.passoutYear);
  //   res.json(users); //all the current 1st to 4th year students are returned as the response
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }
});
//Returns all the students which are currently studing in the college
const getAllStudents = asyncHandler(async (req, res) => {
  try {
    const users = await Student.find({}); //getting all the students from the database
    let students = [];
    users.forEach((user) => {
      if (Number(user.passoutYear) - new Date().getFullYear() >= 0) {
        //checking if the user is the current student or not
        students.push(user);
      }
    });
    students.sort((a, b) => a.passoutYear - b.passoutYear);
    res.json({ students }); //all the current 1st to 4th year students are returned as the response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    // Add object to list for given key's value
    acc[key].push(obj);
    return acc;
  }, {});
}
const getAllBTechStudents = asyncHandler(async (req, res) => {
  try {
    const users = await Student.find({}).select(
      " -cgpa -dob -gender -mobileNo -nationality -address -board10th -passingYear10th -percentage10th -board12th -passingYear12th -percentage12th  -resumeUrl -dateCreated "
    ); //getting all the students from the database
    let students = [];
    users.forEach((user) => {
      if (Number(user.passoutYear) - new Date().getFullYear() >= 0) {
        //checking if the user is the current student or not
        students.push(user);
      }
    });
    let cseStudents = [];
    let eceStudents = [];
    let eeeStudents = [];

    students.forEach((student) => {
      if (student.course === "BTech") {
        if (student.branch === "CSE") cseStudents.push(student);
        else if (student.branch === "ECE") eceStudents.push(student);
        else if (student.branch === "EEE") eeeStudents.push(student);
      }
    });

    cseStudents = groupBy(cseStudents, "passoutYear");
    eceStudents = groupBy(eceStudents, "passoutYear");
    eeeStudents = groupBy(eeeStudents, "passoutYear");
    res.json({ CSE: cseStudents, ECE: eceStudents, EEE: eeeStudents }); //all the current 1st to 4th year students are returned as the response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const getAllMTechStudents = asyncHandler(async (req, res) => {
  try {
    const users = await Student.find({}).select(
      " -cgpa -dob -gender -mobileNo -nationality -address -board10th -passingYear10th -percentage10th -board12th -passingYear12th -percentage12th  -resumeUrl  -dateCreated "
    ); //getting all the students from the database
    let students = [];
    users.forEach((user) => {
      if (Number(user.passoutYear) - new Date().getFullYear() >= 0) {
        //checking if the user is the current student or not
        students.push(user);
      }
    });
    let cseStudents = [];
    let eceStudents = [];
    let eeeStudents = [];

    students.forEach((student) => {
      if (student.course === "MTech") {
        if (student.branch === "CSE") cseStudents.push(student);
        else if (student.branch === "ECE") eceStudents.push(student);
        else if (student.branch === "EEE") eeeStudents.push(student);
      }
    });

    cseStudents = groupBy(cseStudents, "passoutYear");
    eceStudents = groupBy(eceStudents, "passoutYear");
    eeeStudents = groupBy(eeeStudents, "passoutYear");
    res.json({ CSE: cseStudents, ECE: eceStudents, EEE: eeeStudents }); //all the current 1st to 4th year students are returned as the response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const getAllPhDStudents = asyncHandler(async (req, res) => {
  try {
    const users = await Student.find({}).select(
      " -cgpa -dob -gender -mobileNo -nationality -address -board10th -passingYear10th -percentage10th -board12th -passingYear12th -percentage12th  -resumeUrl  -dateCreated "
    ); //getting all the students from the database
    let students = [];
    users.forEach((user) => {
      if (Number(user.passoutYear) - new Date().getFullYear() >= 0) {
        //checking if the user is the current student or not
        students.push(user);
      }
    });
    let cseStudents = [];
    let eceStudents = [];
    let eeeStudents = [];
    let meStudents = [];
    let asStudents = [];

    students.forEach((student) => {
      if (student.course === "PhD") {
        if (student.branch === "CSE") cseStudents.push(student);
        else if (student.branch === "ECE") eceStudents.push(student);
        else if (student.branch === "EEE") eeeStudents.push(student);
        else if (student.branch === "ME") meStudents.push(student);
        else if (student.branch === "AS") asStudents.push(student);
      }
    });

    cseStudents = groupBy(cseStudents, "passoutYear");
    eceStudents = groupBy(eceStudents, "passoutYear");
    eeeStudents = groupBy(eeeStudents, "passoutYear");
    meStudents = groupBy(meStudents, "passoutYear");
    asStudents = groupBy(asStudents, "passoutYear");
    res.json({
      CSE: cseStudents,
      ECE: eceStudents,
      EEE: eeeStudents,
      ME: meStudents,
      AS: asStudents,
    }); //all the current 1st to 4th year students are returned as the response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Returns all the alumnis

const getAllAlumni = asyncHandler(async (req, res) => {
  try {
    const users = await Student.find({}).select(
      " -cgpa -dob -gender -mobileNo -nationality -address -board10th -passingYear10th -percentage10th -board12th -passingYear12th -percentage12th  -resumeUrl  -dateCreated "
    ); //getting all the students from the database
    let alumni = [];
    users.forEach((user) => {
      if (Number(user.passoutYear) - new Date().getFullYear() < 0) {
        //checking if the user is the current student or not
        alumni.push(user);
      }
    });

    alumni = groupBy(alumni, "passoutYear");
    alumni = Object.entries(alumni);

    // alumni.forEach((a) => {
    //   alumni = groupBy(a[1], "course");
    // });
    for (var i = 0; i < alumni.length; i++) {
      alumni[i][1] = groupBy(alumni[i][1], "course");
    }
    res.json(alumni); //returns all the alumnis as the response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const getAlumnis = asyncHandler(async (req, res) => {
  try {
    const users = await Student.find({}).select(
      " -cgpa -dob -gender -mobileNo -nationality -address -board10th -passingYear10th -percentage10th -board12th -passingYear12th -percentage12th  -resumeUrl -dateCreated "
    ); //getting all the students from the database
    let alumni = [];
    users.forEach((user) => {
      if (Number(user.passoutYear) - new Date().getFullYear() < 0) {
        alumni.push(user);
      }
    });
    res.json(alumni); //returns all the alumnis as the response
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
  isEmailAvailable: isEmailAvailable,
  resetPassword: resetPassword,
  getAllBTechStudents: getAllBTechStudents,
  getAllMTechStudents: getAllMTechStudents,
  getAllPhDStudents: getAllPhDStudents,
  getAllUsers: getAllUsers,
  updateUser: updateUser,
  getUserInfo: getUserInfo,
  updateStudent: updateStudent,
  getAlumnis: getAlumnis,
};
