import React, { useState } from "react";
import { useLocation, useParams } from "react-router";
import AlumniCard from "./AlumniCard";
import AlumniFilter from "./AlumniFilter";
const AlumniBranchWise = () => {
  const location = useLocation();
  let course = useParams().course.toString();
  if (course === "btech") course = "BTech";
  else if (course === "mtech") course = "MTech";
  else if (course === "phd") course = "PhD";
  const branch = useParams().branch.toString().toUpperCase();
  const passoutYear = useParams().passoutYear;
  const alumni = location.state; //setting the alumni array as an empty array

  const [filtered, setFiltered] = useState(null);
  const loadFiltered = (filtered) => {
    setFiltered(filtered); //filtering the alumni's
  };
  if (filtered !== null)
    return (
      //returns all the filtered alumni's with individual alumni car
      <div className="container ">
        <h2>
          {course} {branch} {passoutYear} Alumni
        </h2>
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
        <h2>
          {course} {branch} {passoutYear} Alumni
        </h2>
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

export default AlumniBranchWise;
