import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllBTechStudents,
  getAllMTechStudents,
  getAllPhDStudents,
} from "../../../api/apiStudent";

const Students = ({ user }) => {
  const [btechStudents, setbtechStudents] = useState([]); //setting the students array as an empty array
  const [mtechStudents, setmtechStudents] = useState([]); //setting the students array as an empty array
  const [phdStudents, setphdStudents] = useState([]); //setting the students array as an empty array
  const loadBTechStudents = () => {
    getAllBTechStudents()
      .then((data) => {
        setbtechStudents(data); //setting the students array with the response
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadMTechStudents = () => {
    getAllMTechStudents()
      .then((data) => {
        setmtechStudents(data); //setting the students array with the response
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadPhDStudents = () => {
    getAllPhDStudents()
      .then((data) => {
        setphdStudents(data); //setting the students array with the response
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadBTechStudents(); //loading students
    loadMTechStudents();
    loadPhDStudents();
  }, []);
  // const [students, setStudents] = useState([]); //setting the students array as an empty array
  // const loadStudents = () => {
  //   getAllStudents()
  //     .then((data) => {
  //       setStudents(data.students); //setting the students array with the response
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // const [filtered, setFiltered] = useState(null);
  // const loadFiltered = (filtered) => {
  //   setFiltered(filtered); //filtering the students
  // };
  // useEffect(() => {
  //   loadStudents(); //loading students
  // }, students);
  // if (filtered !== null)
  //   return (
  //     //returns all the filtered students with individual student card
  //     <div className="container ">
  //       <h2>Students</h2>
  //       <StudentFilter AllStudents={students} loadFiltered={loadFiltered} />
  //       <div className="row">
  //         {filtered &&
  //           filtered.map((student) => {
  //             return <StudentCard student={student} key={student._id} />;
  //           })}
  //       </div>
  //     </div>
  //   );
  // else
  //   return (
  //     //returns all the students with individual student card
  //     <div className="container ">
  //       <h2>Students</h2>
  //       <StudentFilter AllStudents={students} loadFiltered={loadFiltered} />
  //       <div className="row">
  //         {students &&
  //           students.map((student) => {
  //             return <StudentCard student={student} key={student._id} />;
  //           })}
  //       </div>
  //     </div>
  //   );
  if (Object.keys(user).length !== 0)
    return (
      <div className="studentcontainer studentpanel">
        <Link to={{ pathname: `/students/btech`, state: btechStudents }}>
          <div className="btechpanelcard" />
        </Link>
        <Link to={{ pathname: `/students/mtech`, state: mtechStudents }}>
          <div className="mtechpanelcard" />
        </Link>
        <Link to={{ pathname: `/students/phd`, state: phdStudents }}>
          <div className="phdpanelcard" />
        </Link>
      </div>
    );
  else
    return (
      <div className="not-allowed">
        Sorry, you are not Logged In .Kindly Login In to access this page.
      </div>
    );
};

export default Students;
