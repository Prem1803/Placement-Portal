import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import UserBlogCard from "./blogs/UserBlogCard";
import UserProjectCard from "./projects/UserProjectCard";

import { getAllUserBlogs } from "../../api/apiBlog";
import { getAllStudentProjects } from "../../api/apiProject";
import Spinner from "./Spinner";
import { getUser } from "../../api/apiUser";

const UserDashboard = ({ user, token }) => {
  const userid = useParams().id; //getting userid
  const [blogs, setBlogs] = useState([]); //setting blogs to empty array
  const history = useHistory();
  const [userDetails, setUserDetails] = useState({});
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
  }, userDetails._id);
  const loadBlogs = () => {
    //loading blogs
    if (userDetails._id !== undefined)
      getAllUserBlogs(userDetails._id)
        .then((data) => {
          setBlogs(data.blogs); //setting blogs with the response
        })
        .catch((err) => {
          console.log(err);
        });
  };
  useEffect(() => {
    loadBlogs(); //loading blogs
  }, [blogs.length, userDetails._id]);
  const [projects, setProjects] = useState([]); //setting projects with the empty array
  const loadProjects = () => {
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
  }, [projects.length, userDetails._id]);

  const addProject = () => {
    //adding projects
    history.push(`/users/${userDetails._id}/addProject`); //redirects to add project page
  };
  const addBlog = () => {
    //adding blogs
    history.push(`/users/${userDetails._id}/addBlog`); //redirects to add blog page
  };
  const editProfile = () => {
    //edit profile
    history.push(`/users/${userDetails._id}/editProfile`); //redirects to edit profile page
  };
  if (userDetails._id !== undefined) {
    if (userid === user.sid)
      return (
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
              <button
                onClick={editProfile}
                className="btn btn-dark"
                style={{ float: "right" }}
              >
                <i className="fa fa-edit" />
                Edit Profile
              </button>
            </h2>

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
                      <td className="table-content">Name</td>
                      <td className="no-content">:</td>
                      <td className="table-content">
                        {userDetails.name ? userDetails.name : ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-content">Roll No</td>
                      <td className="no-content">:</td>
                      <td className="table-content">
                        {userDetails.rollNo ? userDetails.rollNo : ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-content">Branch</td>
                      <td className="no-content">:</td>
                      <td className="table-content">
                        {userDetails.branch ? userDetails.branch : ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-content">Course</td>
                      <td className="no-content">:</td>
                      <td className="table-content">
                        {userDetails.batch ? userDetails.batch : ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-content">Passout Year</td>
                      <td className="no-content">:</td>
                      <td className="table-content">
                        {userDetails.year ? userDetails.year : ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-content">CGPA</td>
                      <td className="no-content">:</td>
                      <td className="table-content">
                        {userDetails.cgpa ? userDetails.cgpa : ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-content">Description</td>
                      <td className="no-content">:</td>
                      <td className="table-content">
                        {userDetails.description ? userDetails.description : ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-content">Bio</td>
                      <td className="no-content">:</td>
                      <td className="table-content">
                        {userDetails.bio ? userDetails.bio : ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-content">Works At</td>
                      <td className="no-content">:</td>
                      <td className="table-content">
                        {userDetails.worksAt ? userDetails.worksAt : ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-content">Skills</td>
                      <td className="no-content">:</td>
                      <td className="table-content">
                        {userDetails.skills
                          ? userDetails.skills.map((skill) => {
                              return skill + " ";
                            })
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-content">LinkedIn</td>
                      <td className="no-content">:</td>
                      <td className="table-content">
                        {userDetails.linkedInUrl ? userDetails.linkedInUrl : ""}
                      </td>
                    </tr>
                    {/* <tr>
                      <td>Github</td>
                      <td>:</td>
                      <td>
                        {userDetails.githubUrl ? userDetails.githubUrl : ""}
                      </td>
                    </tr> */}
                    <tr>
                      <td className="table-content">Resume</td>
                      <td className="no-content">:</td>
                      <td className="table-content">
                        {userDetails.resumeUrl ? userDetails.resumeUrl : ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-content">Contact Email</td>
                      <td className="no-content">:</td>
                      <td className="table-content">
                        {userDetails.contactEmail
                          ? userDetails.contactEmail
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-content">Portfolio Website</td>
                      <td className="no-content">:</td>
                      <td className="table-content">
                        {userDetails.portfolioWebsite
                          ? userDetails.portfolioWebsite
                          : ""}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ul>
          </div>
          {/* <div>
            <h2
              style={{
                textAlign: "left",
                paddingTop: "1rem",
                paddingBottom: "1rem",
              }}
            >
              <i className="fas fa-project-diagram"></i> Projects
              <button
                onClick={addProject}
                className="btn btn-dark"
                style={{ float: "right" }}
              >
                Add Project
              </button>
            </h2>
            <div className="project-row">
              {projects &&
                projects.map((project) => {
                  return (
                    <UserProjectCard
                      project={project}
                      key={project._id}
                      token={token}
                      userDetails={userDetails}
                    />
                  );
                })}
            </div>
          </div>
           */}
          <div>
            <h2
              style={{
                textAlign: "left",
                paddingTop: "1rem",
                paddingBottom: "1rem",
              }}
            >
              <i className="fab fa-blogger"></i> Blogs
              <button
                onClick={addBlog}
                className="btn btn-dark"
                style={{ float: "right" }}
              >
                Add Blog
              </button>
            </h2>
            <div className="row">
              {blogs &&
                blogs.map((blog) => {
                  return (
                    <UserBlogCard
                      blog={blog}
                      key={blog._id}
                      token={token}
                      userDetails={userDetails}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      );
    else
      return (
        <div className="not-allowed">
          Sorry, you are not allowed to access this page.
        </div>
      );
  } else {
    return <Spinner />;
  }
};

export default UserDashboard;
