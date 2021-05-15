import React, { useEffect, useState } from "react";
import { getAllProjects } from "../../../api/apiProject";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";

const Projects = () => {
  const [projects, setProjects] = useState([]); //setting project to empty object
  const loadProjects = () => {
    getAllProjects()
      .then((data) => {
        setProjects(data.projects); //setting project with the response
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [filtered, setFiltered] = useState(null);
  const loadFiltered = (filtered) => {
    setFiltered(filtered); //filtering the projects
  };
  useEffect(() => {
    loadProjects(); //loading the project
  }, [projects.length]);
  if (filtered !== null) {
    return (
      //returns all projects with individual project cards
      <div className="container">
        <h2>Projects</h2>
        <ProjectFilter AllProjects={projects} loadFiltered={loadFiltered} />
        <div className="project-row">
          {filtered &&
            filtered.map((project, index) => {
              return <ProjectCard project={project} key={index} />;
            })}
        </div>
      </div>
    );
  } else
    return (
      //returns all projects with individual project cards
      <div className="container">
        <h2>Projects</h2>
        <ProjectFilter AllProjects={projects} loadFiltered={loadFiltered} />
        <div className="project-row">
          {projects &&
            projects.map((project, index) => {
              return <ProjectCard project={project} key={index} />;
            })}
        </div>
      </div>
    );
};

export default Projects;
