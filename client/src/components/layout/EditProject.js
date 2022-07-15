import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import { getProjectById } from "../../api/apiProject";
import Spinner from "./Spinner";
const EditProject = ({ token, userDetails }) => {
  const [project, setProject] = useState({}); //setting project as empty object
  const projectId = useParams().pid; //getting project id
  const userId = useParams().id; //getting user id

  const [stacks, setStacks] = useState(null); //setting stacks as null

  const loadProject = () => {
    //loading project
    getProjectById(projectId)
      .then((data) => {
        setProject(data); //setting project with the response
        setStacks(data.stacks.join()); //setting stacks
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadProject(); //loading project
  }, []);
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const onSubmit = async (e) => {
    e.preventDefault();
    project.stacks = stacks;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${token}`, //passing token to the request headers
      },
    };

    let { data } = await axios.put(
      `/api/projects/${projectId}`, //making backend call to Edit a project
      project,
      config
    );
    setProject(data);
    addToast("Project Updated Successfully", {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 2000,
    });
    //redirecting to the dash board
    navigate(`/userdashboard/${userDetails._id}`);
  };
  const onChange = (e) => {
    //setting project on change in project details from the form
    setProject({ ...project, [e.target.name]: e.target.value });
  };
  const onStackChange = (e) => {
    //setting stacks on change in stacks from the form
    setStacks(e.target.value);
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
      project.image = data;
    } catch (error) {
      console.error(error);
    }
  };
  if (project.studentid) {
    if (project.studentid === userId && project.studentid === userDetails._id)
      return (
        //returns the project form
        <div className="container">
          <form onSubmit={onSubmit}>
            <h1>Edit Project</h1>
            <div className="form-group">
              <label htmlFor="name">Title</label>
              <input
                type="text"
                name="name"
                value={project.name ? project.name : ""}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                name="image"
                onChange={uploadFileHandler}
                {...project.image}
                style={{
                  backgroundColor: "white",
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="stacks">Stacks</label>
              <input
                type="text"
                name="stacks"
                value={
                  project.stacks && project.stacks.length !== 0 ? stacks : ""
                }
                onChange={onStackChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                name="status"
                value={project.status ? project.status : ""}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                rows={8}
                name="description"
                value={project.description ? project.description : ""}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="repoUrl">RepoUrl</label>
              <input
                type="text"
                name="repoUrl"
                value={project.repoUrl ? project.repoUrl : ""}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="demoUrl">DemoUrl</label>
              <input
                type="text"
                name="demoUrl"
                value={project.demoUrl ? project.demoUrl : ""}
                onChange={onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        </div>
      );
    else
      return (
        <div className="not-allowed">
          Sorry, you are not allowed to Edit this project..
        </div>
      );
  } else return <Spinner />;
};

export default EditProject;
