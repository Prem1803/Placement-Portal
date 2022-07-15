import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import StudentCard from "./StudentCard";
import StudentFilter from "./StudentFilter";
const BatchWiseStudents = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  let course = useParams().course.toString();
  if (course === "btech") course = "BTech";
  else if (course === "mtech") course = "MTech";
  else if (course === "phd") course = "PhD";
  const branch = useParams().branch.toString().toUpperCase();
  const passoutYear = useParams().passoutYear;
  const students = location.state; //setting the students array as an empty array

  const [filtered, setFiltered] = useState(null);
  const loadFiltered = (filtered) => {
    setFiltered(filtered); //filtering the students
  };
  if (students === undefined) {
    navigate("/students");
  }
  if (Object.keys(user).length !== 0) {
    if (filtered !== null)
      return (
        //returns all the filtered students with individual student card
        <div className="container ">
          <h2>
            {course} {branch} {passoutYear}
          </h2>
          <StudentFilter AllStudents={students} loadFiltered={loadFiltered} />
          <div className="row">
            {filtered &&
              filtered.map((student) => {
                return <StudentCard student={student} key={student._id} />;
              })}
          </div>
        </div>
      );
    else
      return (
        //returns all the students with individual student card
        <div className="container ">
          <h2>
            {course} {branch} {passoutYear}
          </h2>
          <StudentFilter AllStudents={students} loadFiltered={loadFiltered} />
          <div className="row">
            {students &&
              students.map((student) => {
                return <StudentCard student={student} key={student._id} />;
              })}
          </div>
        </div>
      );
  } else
    return (
      <div className="not-allowed">
        Sorry, you are not Logged In .Kindly Login In to access this page.
      </div>
    );
};

export default BatchWiseStudents;
