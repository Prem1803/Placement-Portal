import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUser } from "../../api/apiUser";
import BlogCard from "./blogs/BlogCard";
import { getAllUserBlogs } from "../../api/apiBlog";

import Spinner from "./Spinner";

const UserProfile = ({ user }) => {
  const [userDetails, setUserDetails] = useState({}); //setting the user details as an empty object
  const userid = useParams().id; //getting user id
  const [blogs, setBlogs] = useState([]); //setting blogs to empty array

  useEffect(() => {
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
    loadBlogs(); //loading blogs
  }, [userDetails._id]);

  useEffect(() => {
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
    loadUser(); //loading user
  }, []);
  if (Object.keys(user).length !== 0) {
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
                          src={userDetails.imgUrl}
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
                        {userDetails.course ? userDetails.course : ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-content">Passout Year</td>
                      <td className="no-content">:</td>
                      <td className="table-content">
                        {userDetails.passoutYear ? userDetails.passoutYear : ""}
                      </td>
                    </tr>
                    {/* <tr>
                      <td className="table-content">CGPA</td>
                      <td className="no-content">:</td>
                      <td className="table-content">{userDetails.cgpa ? userDetails.cgpa : ""}</td>
                    </tr> */}

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
                    {/* <tr>
                      <td>Resume</td>
                      <td>:</td>
                      <td>
                        {userDetails.resumeUrl ? userDetails.resumeUrl : ""}
                      </td>
                    </tr> */}
                    <tr>
                      <td className="table-content">Contact Email</td>
                      <td className="no-content">:</td>
                      <td className="table-content">
                        {userDetails.contactEmail
                          ? userDetails.contactEmail
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
  } else
    return (
      <div className="not-allowed">
        Sorry, you are not Logged In .Kindly Login In to access this page.
      </div>
    );
};

export default UserProfile;
