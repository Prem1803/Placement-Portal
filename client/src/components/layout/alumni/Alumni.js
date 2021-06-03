import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllAlumni } from "../../../api/apiAlumni";

const Alumni = ({ user }) => {
  //Alumni component
  const [alumni, setAlumni] = useState([]); //setting alumni as empty array
  const loadAlumni = () => {
    //loading all the alumni's
    getAllAlumni()
      .then((data) => {
        setAlumni(data); //setting alumni's according to the response
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadAlumni(); //loading the alumni's
  }, []);
  if (Object.keys(user).length !== 0)
    return (
      <div className="studentcontainer studentpanel ">
        {alumni &&
          alumni.reverse().map((alumni) => {
            return (
              <Link
                to={{ pathname: `/alumni/${alumni[0]}`, state: alumni[1] }}
                key={alumni[0]}
              >
                <div className="alumnipanelcard" />
                Batch Of {alumni[0]}
              </Link>
            );
          })}
      </div>
    );
  else
    return (
      <div className="not-allowed">
        Sorry, you are not Logged In .Kindly Login In to access this page.
      </div>
    );
};

export default Alumni;
