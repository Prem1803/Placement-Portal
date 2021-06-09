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
