import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUser } from "../../api/apiUser";
import BlogCard from "./blogs/BlogCard";
import ProjectCard from "./projects/ProjectCard";
import { getAllUserBlogs } from "../../api/apiBlog";

import { getAllStudentProjects } from "../../api/apiProject";
import Spinner from "./Spinner";

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({}); //setting the user details as an empty object
  const userid = useParams().id; //getting user id
  const [blogs, setBlogs] = useState([]); //setting blogs to empty array
  const loadBlogs = () => {
    //loading blogs
    if (userDetails._id !== undefined)
      getAllUserBlogs(userDetails._id)
        .then((data) => {
          setBlogs(data.blogs); //setting blogs with response
        })
        .catch((err) => {
          console.log(err);
        });
  };
  useEffect(() => {
    loadBlogs(); //loading blogs
  }, userDetails._id);
  const loadUser = () => {
    //loading user
    getUser(userid)
      .then((data) => {
        setUserDetails(data); //setting user details with the response
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadUser(); //loading user
  }, userDetails);
  const [projects, setProjects] = useState([]); //setting projects to empty array

  const loadProjects = () => {
    //loading projects
    if (userDetails._id !== undefined)
      getAllStudentProjects(userDetails._id)
        .then((data) => {
          setProjects(data.projects); //setting projects with the response
        })
        .catch((err) => {
          console.log(err);
        });
  };
  useEffect(() => {
    loadProjects(); //loading projects
  }, userDetails._id);
  if (userDetails._id !== undefined)
    return (
      //returns user profile card

      <div className="container">
        <div>
          <h2
            style={{
              textAlign: "left",
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
          >
            <i className="fas fa-user"></i> Profile
          </h2>
          <h4>
            <ul className="profile-container">
              <div className="profile-content">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <img
                          className="round-img"
                          style={{
                            height: "200px",
                            display: "block",
                            width: "200px",
                            paddingBottom: "1rem",
                            textAlign: "center",
                            margin: "0 auto",
                          }}
                          src={
                            require(`../../uploads/${userDetails.imgUrl}`)
                              .default
                          }
                          alt={userDetails.name}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Name</td>
                      <td>:</td>
                      <td>{userDetails.name ? userDetails.name : ""}</td>
                    </tr>
                    <tr>
                      <td>Roll No</td>
                      <td>:</td>
                      <td>{userDetails.rollNo ? userDetails.rollNo : ""}</td>
                    </tr>
                    <tr>
                      <td>Branch</td>
                      <td>:</td>
                      <td>{userDetails.branch ? userDetails.branch : ""}</td>
                    </tr>
                    <tr>
                      <td>Batch</td>
                      <td>:</td>
                      <td>{userDetails.batch ? userDetails.batch : ""}</td>
                    </tr>
                    <tr>
                      <td>Description</td>
                      <td>:</td>
                      <td>
                        {userDetails.description ? userDetails.description : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>Bio</td>
                      <td>:</td>
                      <td>{userDetails.bio ? userDetails.bio : ""}</td>
                    </tr>
                    <tr>
                      <td>Works At</td>
                      <td>:</td>
                      <td>{userDetails.worksAt ? userDetails.worksAt : ""}</td>
                    </tr>
                    <tr>
                      <td>Skill</td>
                      <td>:</td>
                      <td>
                        {userDetails.skills
                          ? userDetails.skills.map((skill) => {
                              return skill + " ";
                            })
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>LinkedIn</td>
                      <td>:</td>
                      <td>
                        {userDetails.linkedInUrl ? userDetails.linkedInUrl : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>Github</td>
                      <td>:</td>
                      <td>
                        {userDetails.githubUrl ? userDetails.githubUrl : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>Resume</td>
                      <td>:</td>
                      <td>
                        {userDetails.resumeUrl ? userDetails.resumeUrl : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>Contact Email</td>
                      <td>:</td>
                      <td>
                        {userDetails.contactEmail
                          ? userDetails.contactEmail
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>Portfolio Website</td>
                      <td>:</td>
                      <td>
                        {userDetails.portfolioWebsite
                          ? userDetails.portfolioWebsite
                          : ""}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ul>
          </h4>
        </div>
        <div>
          <h2
            style={{
              textAlign: "left",
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
          >
            <i className="fas fa-project-diagram"></i> Projects
          </h2>
          <div className="project-row">
            {projects &&
              projects.map((project) => {
                return (
                  <ProjectCard
                    project={project}
                    key={project._id}
                    userName={userDetails.name}
                  />
                );
              })}
          </div>
        </div>
        <div>
          <h2
            style={{
              textAlign: "left",
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
          >
            <i className="fab fa-blogger"></i> Blogs
          </h2>
          <div className="row">
            {blogs &&
              blogs.map((blog) => {
                return <BlogCard blog={blog} key={blog._id} />;
              })}
          </div>
        </div>
      </div>
    );
  else return <Spinner />;
};

export default UserProfile;
