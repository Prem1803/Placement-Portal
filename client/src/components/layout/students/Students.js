import React, { useEffect, useState } from "react";
import { getAllStudents } from "../../../api/apiStudent";
import StudentCard from "./StudentCard";
import StudentFilter from "./StudentFilter";
const Students = () => {
  const [students, setStudents] = useState([]); //setting the students array as an empty array
  const loadStudents = () => {
    getAllStudents()
      .then((data) => {
        setStudents(data.students); //setting the students array with the response
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [filtered, setFiltered] = useState(null);
  const loadFiltered = (filtered) => {
    setFiltered(filtered); //filtering the students
  };
  useEffect(() => {
    loadStudents(); //loading students
  }, students);
  if (filtered !== null)
    return (
      //returns all the filtered students with individual student card
      <div className="container ">
        <h2>Students</h2>
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
        <h2>Students</h2>
        <StudentFilter AllStudents={students} loadFiltered={loadFiltered} />
        <div className="row">
          {students &&
            students.map((student) => {
              return <StudentCard student={student} key={student._id} />;
            })}
        </div>
      </div>
    );
};

export default Students;
