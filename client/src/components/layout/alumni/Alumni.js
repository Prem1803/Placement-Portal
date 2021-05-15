import React, { useState, useEffect } from "react";
import { getAllAlumni } from "../../../api/apiAlumni";
import AlumniCard from "./AlumniCard";
import AlumniFilter from "./AlumniFilter";
const Alumni = () => {
  //Alumni component
  const [alumni, setAlumni] = useState([]); //setting alumni as empty array
  const loadAlumni = () => {
    //loading all the alumni's
    getAllAlumni()
      .then((data) => {
        setAlumni(data.alumni); //setting alumni's according to the response
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [filtered, setFiltered] = useState(null);
  const loadFiltered = (filtered) => {
    setFiltered(filtered); //filtering the alumni's
  };
  useEffect(() => {
    loadAlumni(); //loading the alumni's
  }, alumni.length);
  if (filtered !== null)
    return (
      //returns all the filtered alumni's with individual alumni car
      <div className="container ">
        <h2>Alumni</h2>
        <AlumniFilter AllAlumni={alumni} loadFiltered={loadFiltered} />
        <div className="row">
          {filtered &&
            filtered.map((alumni) => {
              return <AlumniCard alumni={alumni} key={alumni._id} />;
            })}
        </div>
      </div>
    );
  else
    return (
      //returns all the alumni's with individual alumni car
      <div className="container ">
        <h2>Alumni</h2>
        <AlumniFilter AllAlumni={alumni} loadFiltered={loadFiltered} />
        <div className="row">
          {alumni &&
            alumni.map((alumni) => {
              return <AlumniCard alumni={alumni} key={alumni._id} />;
            })}
        </div>
      </div>
    );
};

export default Alumni;
