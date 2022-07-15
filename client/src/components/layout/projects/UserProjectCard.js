import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { deleteProjectById } from "../../../api/apiProject";
const UserProjectCard = ({
  project: {
    _id,
    name,
    stacks,
    description,
    website,
    github,
    image,
    needs,
    status,
    user,
  },
  token,
  userDetails,
}) => {
  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    //handles the project toggle
    setActive(!isActive);
  };
  const { addToast } = useToasts();
  const history = useHistory();
  const deleteProject = () => {
    deleteProjectById(_id, token) //delets the project
      .then((data) => {
        addToast("Project Deleted", {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
        history.push(`/users/${userDetails._id}`); //redirects to the user page
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editProject = () => {
    history.push(`/users/${userDetails._id}/projects/${_id}/edit`); //redirects to the edit project page
  };

  return (
    //returns the project card
    <div className="col col-resonsive">
      <div className="project-card hoverable ">
        <div style={isActive ? { display: "block" } : { display: "none" }}>
          <div className="card-image waves-effect waves-block waves-light">
            <img
              style={{ height: "200px" }}
              className="activator"
              src={image}
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
                <a href={website} target="blank" className="button ">
                  {" "}
                  Demo{" "}
                </a>
              </span>
              <span>
                <a href={github} target="blank" className="button">
                  Github
                </a>
              </span>
            </div>
            <div
              className="row"
              style={{
                paddingTop: "1rem",
                paddingLeft: "1rem",
              }}
            >
              <span>
                <button className="tag tag-purple" onClick={editProject}>
                  <i className="fas fa-edit"></i> Edit
                </button>
              </span>
              <span>
                <button className="tag tag-purple" onClick={deleteProject}>
                  <i className="fas fa-trash"></i> Delete
                </button>
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

export default UserProjectCard;
