import React, { useState } from "react";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { useHistory, useParams } from "react-router";
import Spinner from "./Spinner";

export const ProjectForm = ({ user, token, userDetails }) => {
  const { addToast } = useToasts();
  const userId = useParams().id; //getting user id

  const history = useHistory();
  const [project, setProject] = useState({}); //setting project as empty object
  const onSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${token}`, //passing token to the request headers
      },
    };

    let { data } = await axios.post(
      `/api/projects/`, //making backend call to add a project
      project,
      config
    );

    setProject(JSON.parse(JSON.stringify(data))); //setting project with the resonse

    addToast("Project Addded Successfully", {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 2000,
    });
    //redirecting to the dahboard
    history.push(`/userdashboard/${userDetails._id}`);
  };
  const onChange = (e) => {
    //setting project on change in project details from the form
    setProject({ ...project, [e.target.name]: e.target.value });
  };
  const uploadFileHandler = async (e) => {
    //uploading the project image
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/upload", //making backend call to upload the image
        formData,
        config
      );
      project.image = data.slice(data.indexOf("image"));
    } catch (error) {
      console.error(error);
    }
  };
  if (user) {
    if (user.type === 0 && user.sid === userId)
      return (
        //returns the project form
        <div className="container">
          <form onSubmit={onSubmit}>
            <h1>Add Project</h1>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" onChange={onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                name="image"
                onChange={uploadFileHandler}
                style={{
                  backgroundColor: "white",
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="stacks">Stacks</label>
              <input type="text" name="stacks" onChange={onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <input type="text" name="status" onChange={onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea rows={8} name="description" onChange={onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="repoUrl">RepoUrl</label>
              <input type="text" name="repoUrl" onChange={onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="demoUrl">DemoUrl</label>
              <input type="text" name="demoUrl" onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Project
            </button>
          </form>
        </div>
      );
    else
      return (
        <div className="not-allowed">
          Sorry, you are not allowed to Add Projects.
        </div>
      );
  } else return <Spinner />;
};
export default ProjectForm;
