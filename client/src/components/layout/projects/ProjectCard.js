import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../../api/apiUser";

const ProjectCard = ({
  project: {
    name,
    stacks,
    description,
    demoUrl,
    repoUrl,
    image,

    status,
    studentid,
  },
}) => {
  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive); //handles the project toggle
  };
  const [studentName, setStudentName] = useState(null); //setting the student name as null
  const loadStudentName = () => {
    getUser(studentid)
      .then((data) => {
        setStudentName(data.name); //setting the student with the response
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadStudentName(); //loading the student whome this project belongs to
  }, [studentName]);
  return (
    //returns the Project card
    <div className="col col-resonsive">
      <div className="project-card hoverable ">
        <div style={isActive ? { display: "block" } : { display: "none" }}>
          <div className="card-image waves-effect waves-block waves-light">
            <img
              style={{ height: "200px" }}
              className="activator"
              src={require(`../../../uploads/${image}`).default}
              alt={name}
            />
          </div>

          <div className="card-content">
            <div>
              {stacks &&
                stacks.map((value, index) => {
                  return (
                    <div key={value} className="icon">
                      <span className=" default">
                        {value}
                        <span />
                      </span>
                    </div>
                  );
                })}
            </div>
            <span className="card-title activator grey-text text-darken-4">
              {name}
              <i
                className="fas fa-chevron-circle-down material-icons right"
                onClick={handleToggle}
              ></i>
            </span>
            <div className="developer-profile-action-buttons">
              <span>
                <a href={demoUrl} target="blank" className="button ">
                  {" "}
                  Demo{" "}
                </a>
              </span>
              <span>
                <a href={repoUrl} target="blank" className="button">
                  Github
                </a>
              </span>
              <span>
                <Link
                  style={{ float: "right" }}
                  to={`/users/${studentid}`}
                  className="button tag-teal"
                >
                  by {studentName}
                </Link>
              </span>
            </div>
          </div>
        </div>
        <div
          style={isActive ? { display: "none" } : { display: "block" }}
          className="card-reveal"
        >
          <span className="card-title grey-text text-darken-4">
            {name}
            <i
              className="fas fa-window-close material-icons right"
              onClick={handleToggle}
            ></i>
          </span>
          <div>
            <span className="status">{status}</span>
          </div>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
