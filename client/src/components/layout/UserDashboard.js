import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import UserBlogCard from "./blogs/UserBlogCard";

import { getAllUserBlogs } from "../../api/apiBlog";
import Spinner from "./Spinner";
import { getUserInfo } from "../../api/apiUser";

const UserDashboard = ({ user, token }) => {
  // const userid = useParams().id; //getting userid
  const [blogs, setBlogs] = useState([]); //setting blogs to empty array
  const history = useHistory();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const loadUser = () => {
      //loading user
      if (user.sid)
        getUserInfo(user.sid)
          .then((data) => {
            setUserDetails(data); //setting user details with the response
          })
          .catch((err) => {
            console.log(err);
          });
    };
    loadUser(); //loading user
  }, []);

  useEffect(() => {
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
    loadBlogs(); //loading blogs
  }, [userDetails._id]);

  const addBlog = () => {
    //adding blogs
    history.push({ pathname: `/addBlog`, state: { postedBy: 0 } }); //redirects to add blog page
  };
  const editProfile = () => {
    //edit profile
    history.push(`/editProfile`); //redirects to edit profile page
  };
  const changePassword = () => {
    history.push({
      pathname: "/changepassword",
      state: {
        email: user.email,
      },
    });
  };
  if (Object.keys(user).length !== 0) {
    if (userDetails._id !== undefined) {
      if (user.sid)
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
                  <i className="fa fa-edit" /> Edit Profile
                </button>
                <button
                  onClick={changePassword}
                  className="btn btn-dark"
                  style={{ float: "right" }}
                >
                  <i className="fas fa-key" /> Change Password
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
                          {userDetails.passoutYear
                            ? userDetails.passoutYear
                            : ""}
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
                        <td className="table-content">Date Of Birth</td>
                        <td className="no-content">:</td>
                        <td className="table-content">
                          {userDetails.dob ? userDetails.dob : ""}
                        </td>
                      </tr>
                      <tr>
                        <td className="table-content">Gender</td>
                        <td className="no-content">:</td>
                        <td className="table-content">
                          {userDetails.gender ? userDetails.gender : ""}
                        </td>
                      </tr>
                      <tr>
                        <td className="table-content">Mobile No</td>
                        <td className="no-content">:</td>
                        <td className="table-content">
                          {userDetails.mobileNo ? userDetails.mobileNo : ""}
                        </td>
                      </tr>
                      <tr>
                        <td className="table-content">Nationality</td>
                        <td className="no-content">:</td>
                        <td className="table-content">
                          {userDetails.nationality
                            ? userDetails.nationality
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td className="table-content">Address</td>
                        <td className="no-content">:</td>
                        <td className="table-content">
                          {userDetails.address ? userDetails.address : ""}
                        </td>
                      </tr>
                      <tr>
                        <td className="table-content">10th Board</td>
                        <td className="no-content">:</td>
                        <td className="table-content">
                          {userDetails.board10th ? userDetails.board10th : ""}
                        </td>
                      </tr>
                      <tr>
                        <td className="table-content">10th Passing Year</td>
                        <td className="no-content">:</td>
                        <td className="table-content">
                          {userDetails.passingYear10th
                            ? userDetails.passingYear10th
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td className="table-content">10th Percentage/CGPA</td>
                        <td className="no-content">:</td>
                        <td className="table-content">
                          {userDetails.percentage10th
                            ? userDetails.percentage10th
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td className="table-content">12th Board</td>
                        <td className="no-content">:</td>
                        <td className="table-content">
                          {userDetails.board12th ? userDetails.board12th : ""}
                        </td>
                      </tr>
                      <tr>
                        <td className="table-content">12th Passing Year</td>
                        <td className="no-content">:</td>
                        <td className="table-content">
                          {userDetails.passingYear12th
                            ? userDetails.passingYear12th
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td className="table-content">12th Percentage/CGPA</td>
                        <td className="no-content">:</td>
                        <td className="table-content">
                          {userDetails.percentage12th
                            ? userDetails.percentage12th
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td className="table-content">Linked In</td>
                        <td className="no-content">:</td>
                        <td className="table-content">
                          {userDetails.linkedInUrl
                            ? userDetails.linkedInUrl
                            : ""}
                        </td>
                      </tr>

                      <tr>
                        <td className="table-content">Resume </td>
                        <td className="no-content">:</td>
                        <td className="table-content">
                          {userDetails.resumeUrl ? userDetails.resumeUrl : ""}
                        </td>
                      </tr>
                      <tr>
                        <td className="table-content">Interests</td>
                        <td className="no-content">:</td>
                        <td className="table-content">
                          {userDetails.interests ? userDetails.interests : ""}
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
                        user={user}
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
  } else
    return (
      <div className="not-allowed">
        Sorry, you are not Logged In .Kindly Login In to access this page.
      </div>
    );
};

export default UserDashboard;
